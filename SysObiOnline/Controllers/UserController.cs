using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SysObiOnline.Data;
using SysObiOnline.DTOS;
using SysObiOnline.Models;
using SysObiOnline.Service;
using System.Net;
namespace SysObiOnline.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly AppDbContext _context;

        public UserController(UserService userService, AppDbContext context)
        {
            _userService = userService;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(CreateUserDTO dto)
        {
            try
            {
                await _userService.CreateUser(dto);
                return Ok(new { message = "Usuário criado com sucesso!" });
            }
            catch (DbUpdateException ex)
            {
                throw new Exception("Erro ao salvar no banco: " + ex.InnerException?.Message);
            }
        }
        

        [HttpPut]
        public async Task<IActionResult> UpdateUser(int id, CreateUserDTO dto)
        {
            try
            {
                var update = await _userService.UpdateUser(id, dto);
                return Ok(update);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}/name")]
        public async Task<IActionResult> UpdateUserName(int id, [FromBody] UpdateUserNameDTO dto)
        {
            try
            {
                var updatedUser = await _userService.UpdateUserName(id, dto.Name);
                return Ok(new { message = "Usuário atualizado com sucesso!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}/password")]
        public async Task<IActionResult> UpdatePassword(int id, [FromBody] UpdatePasswordDTO dto)
        {
            if (string.IsNullOrEmpty(dto.NewPassword))
            {
                return BadRequest("A nova senha não pode ser vazia.");
            }

            var result = await _userService.UpdateUserPassword(id, dto.NewPassword);

            if (!result)
            {
                return NotFound("Usuário não encontrado.");
            }

            return Ok(new { message = "Senha alterada com sucesso." });
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Users))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                var user = await _userService.GetById(id);
                if (user == null) return BadRequest("Esse usuário não foi encontrado!");
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex);
            }
        }
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Users))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                await _userService.DeleteUser(id);
                return NoContent();
            } catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, new { message = "Erro ao tentar excluir o produto.", error = ex.Message });
            }
        }
    }
}
