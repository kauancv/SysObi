using SysObiOnline.Enums;
using System.ComponentModel.DataAnnotations;

namespace SysObiOnline.Models
{
    public class Users
    {
        [Required]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }               
        public string PasswordHash { get; set; }     
        public RoleType Role { get; set; } 

    }
}
