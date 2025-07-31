using Microsoft.EntityFrameworkCore;
using SysObiOnline.Data;
using SysObiOnline.Models;
using SysObiOnline.Repository.Interface;

namespace SysObiOnline.Repository
{
    public class UserRepository : IUsersInterface
    {

        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateUser(Users users)
        {
            _context.Users.Add(users);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new Exception("Erro ao salvar no banco: " + ex.InnerException?.Message);
            }

        }

        public async Task DeleteUser(Users users)
        {
            _context.Users.Remove(users);
            await _context.SaveChangesAsync();
        }

        public async Task<Users> GetByEmail(string email)
        {
            var emailNormalized = email.Trim().ToLower();
            return await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == emailNormalized);
        }


        public async Task<Users> GetById(int id)
        {
            var iduser = await _context.Users.FindAsync(id);
            return iduser;
        }

        public async Task<List<Users>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task UpdateUser(Users users)
        {
            _context.Users.Update(users);
            await _context.SaveChangesAsync();
        }
    }
}
