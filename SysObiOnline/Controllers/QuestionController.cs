using Microsoft.AspNetCore.Mvc;
using SysObiOnline.DTOS;

namespace SysObiOnline.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using SysObiOnline.Data;
    using SysObiOnline.Models;
    using SysObiOnline.Service;

    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]

    public class QuestionController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly QuestionService _questionService;

        public QuestionController(QuestionService questionService, AppDbContext context)
        {
            _questionService = questionService;
            _context = context;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateQuestionDTO dto)
        {
            try
            {
                var created = await _questionService.CreateQuestion(dto);
                return Ok(new { message = "Questão criada com sucesso!", data = created });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetByName(string name)
        {
            try
            {
                var question = await _questionService.GetByName(name);
                return question != null ? Ok(question) : NotFound("Question not found.");
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("update/{name}")]
        public async Task<IActionResult> Update(string name, [FromBody] Question updated)
        {
            try
            {
                var result = await _questionService.UpdateQuestion(name, updated);
                return Ok(result);
            }
            catch (ArgumentNullException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }


        [HttpGet("all-names")]
        public async Task<IActionResult> GetAllNames()
        {
            try
            {
                var names = await _questionService.GetAllQuestionNamesAsync();
                return Ok(names);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
        
        [AllowAnonymous]
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilteredQuestions(string level, string year, string phase)
        {
            var filteredQuestions = await _questionService.GetFilteredQuestions(level, year, phase);
            
            if (!filteredQuestions.Any())
            {
                return NotFound(new { Message = "Nenhuma questão encontrada para o filtro especificado." });
            }

            return Ok(filteredQuestions); 
        }


    }

}
