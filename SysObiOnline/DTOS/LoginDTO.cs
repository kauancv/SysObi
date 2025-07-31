namespace SysObiOnline.DTOS
{
    public class LoginDTO // Login Data Transfer Object - input for login operations
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
