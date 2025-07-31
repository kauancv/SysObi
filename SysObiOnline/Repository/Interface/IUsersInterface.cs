using SysObiOnline.Models;

namespace SysObiOnline.Repository.Interface
{
    public interface IUsersInterface
    {
        public Task CreateUser(Users users);
        public Task UpdateUser(Users users);
        public Task DeleteUser(Users users);
        public Task<Users> GetById(int Id);
        public Task<List<Users>> GetUsers();
        public Task<Users> GetByEmail(string email);
    }
}
