using System.ComponentModel.DataAnnotations;

namespace SysObiOnline.DTOS
{
    public class CreateUserDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }

}
