using Microsoft.EntityFrameworkCore;
using SysObiOnline.Data;
using SysObiOnline.Models;
using SysObiOnline.Repository.Interface;

namespace SysObiOnline.Repository
{
    public class QuizResultRepository : IQuizResultInterface
    {
        private readonly AppDbContext _context;

        public QuizResultRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task SaveResultAsync(QuizResult result)
        {
            await _context.QuizResults.AddAsync(result);
            await _context.SaveChangesAsync();
        }

        /*public async Task<List<QuizResult>> GetResultsByUserAsync(int userId)
        {
            return await _context.QuizResults
                .Where(r => r.UserId == userId)
                .Include(r => r.AnswersGiven)
                .ToListAsync();
        }*/
    }

}