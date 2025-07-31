using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SysObiOnline.DTOS;
using SysObiOnline.Enums;
using SysObiOnline.Helpers;
using SysObiOnline.Models;
using SysObiOnline.Repository.Interface;

namespace SysObiOnline.Service
{
    public class UserService
    {
        private readonly IUsersInterface _userRepository;
        private readonly IConfiguration _configuration;


        public UserService(IUsersInterface userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<UsersDTO> CreateUser(CreateUserDTO dto)
        {
            var newUser = new Users
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = Enum.Parse<RoleType>(dto.Role, true)
            };

            await _userRepository.CreateUser(newUser);

            return new UsersDTO
            {
                Name = newUser.Name,
                Email = newUser.Email,
                Role = newUser.Role.ToString()
            };
        }
        public async Task<Users> GetById(int id)
        {
            if (id < 0) throw new ArgumentException("identificado impossivel!");
            var user = await _userRepository.GetById(id);
            return user;
        }
        public async Task<UsersDTO> UpdateUser(int id, CreateUserDTO dto)
        {
            var existingUser = await _userRepository.GetById(id);
            if (existingUser == null) throw new Exception("Usuário não encontrado");

            existingUser.Name = dto.Name;
            existingUser.Email = dto.Email;
            existingUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            existingUser.Role = Enum.Parse<RoleType>(dto.Role, true);

            await _userRepository.UpdateUser(existingUser);

            return new UsersDTO
            {
                Name = existingUser.Name,
                Email = existingUser.Email,
                Role = existingUser.Role.ToString()
            };
        }
        public async Task DeleteUser(int id)
        {
            var deletedUser = await _userRepository.GetById(id);
            if (deletedUser == null) throw new KeyNotFoundException("Argumento de id incorreto.");
            await _userRepository.DeleteUser(deletedUser);
        }

        public async Task<string> Authenticate(LoginDTO dto)
        {
            var user = await _userRepository.GetByEmail(dto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                throw new Exception("Credenciais inválidas");

            var token = JwtHelper.GenerateToken(user, _configuration);
            return token;
        }

        public async Task<bool> UpdateUserPassword(int userId, string newPassword)
        {

            var userToUpdate = await _userRepository.GetById(userId); // ou método similar

            if (userToUpdate == null) throw new Exception("Usuário não encontrado");

            userToUpdate.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);

            await _userRepository.UpdateUser(userToUpdate);

            return true;
        }

        public async Task<UsersDTO> UpdateUserName(int id, string newName)
        {
            var existingUser = await _userRepository.GetById(id);
            if (existingUser == null) throw new Exception("Usuário não encontrado");

            existingUser.Name = newName;

            await _userRepository.UpdateUser(existingUser);

            return new UsersDTO
            {
                Name = existingUser.Name,
                Email = existingUser.Email,
                Role = existingUser.Role.ToString()
            };
        }

    }
}
