using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SysObiOnline.Data;
using SysObiOnline.DTOS;
using SysObiOnline.Service;

namespace SysObiOnline.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly AppDbContext _context;


        public LoginController(UserService userservice, AppDbContext context)
        {
            _userService = userservice;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            try
            {
                var token = await _userService.Authenticate(dto);
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                return Unauthorized(new { Error = ex.Message });
            }
        }

    }
}
