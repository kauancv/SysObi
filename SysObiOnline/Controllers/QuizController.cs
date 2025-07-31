using Microsoft.AspNetCore.Mvc;
using SysObiOnline.DTOS;
using SysObiOnline.Service;

namespace SysObiOnline.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuizController : ControllerBase
    {
        private readonly QuizService _quizService;

        public QuizController(QuizService quizService)
        {
            _quizService = quizService;
        }
        [HttpPost("save-result/{userId}")]
        public async Task<IActionResult> SaveResult(int userId, [FromBody] QuizResultDTO dto)
        {
            try
            {
                var result = await _quizService.SaveQuizResult(userId, dto);
                return Ok(new { message = "Resultado salvo com sucesso!", data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("report/{userId}")]
        // [Authorize] foi removido
        public async Task<IActionResult> GetReport(int userId)
        {
            try
            {
                var report = await _quizService.GetUserReport(userId);
                return Ok(report);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}