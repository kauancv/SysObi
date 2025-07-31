using Microsoft.EntityFrameworkCore;
using SysObiOnline.Data;
using SysObiOnline.DTOS;
using SysObiOnline.Models;

namespace SysObiOnline.Service
{
    public class QuizService
    {
        private readonly AppDbContext _context;

        public QuizService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<QuizResult> SaveQuizResult(int userId, QuizResultDTO dto)
        {
            var existingResult = await _context.QuizResults.FirstOrDefaultAsync(r => r.UserId == userId);

            if (existingResult != null)
            {
                existingResult.TotalCorrect += dto.TotalCorrect;
                existingResult.TotalIncorrect += dto.TotalIncorrect;
            }
            else
            {
                existingResult = new QuizResult
                {
                    UserId = userId,
                    TotalCorrect = dto.TotalCorrect,
                    TotalIncorrect = dto.TotalIncorrect
                };
                await _context.QuizResults.AddAsync(existingResult);
            }

            await _context.SaveChangesAsync();
            return existingResult;
        }

        public async Task<QuizSummaryDTO> GetUserReport(int userId)
        {
            var result = await _context.QuizResults.FirstOrDefaultAsync(r => r.UserId == userId);

            if (result == null)
            {
                return new QuizSummaryDTO { Message = "Nenhum resultado encontrado." };
            }

            return new QuizSummaryDTO
            {
                TotalQuestions = result.TotalCorrect + result.TotalIncorrect,
                TotalCorrect = result.TotalCorrect,
                TotalIncorrect = result.TotalIncorrect,
                Message = "Relatório gerado com sucesso."
            };
        }
    }
}