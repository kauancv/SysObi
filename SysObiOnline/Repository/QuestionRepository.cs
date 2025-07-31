using Microsoft.EntityFrameworkCore;
using SysObiOnline.Data;
using SysObiOnline.Models;
using SysObiOnline.Repository.Interface;

namespace SysObiOnline.Repository
{
    public class QuestionRepository : IQuestionInterface
    {
        private readonly AppDbContext _context;

        public QuestionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateQuestion(Question question)
        {
            _context.Question.Add(question);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new Exception("Erro ao salvar no banco: " + ex.InnerException?.Message);
            }
        }

        public async Task<List<string>> GetAllQuestionNamesAsync()
        {
            return await _context.Question
                .Select(q => q.Name)
                .ToListAsync();
        }

        public async Task<Question> GetQuestionById(int id)
        {
            return await _context.Question.FindAsync(id);
        }

        public async Task<Question> GetQuestionByName(string name)
        {
            if (string.IsNullOrEmpty(name)) throw new ArgumentNullException("name");
            return await _context.Question.FirstOrDefaultAsync(c => c.Name == name);
        }

        public async Task UpdateQuestion(Question question)
        {
            _context.Question.Update(question);
            await _context.SaveChangesAsync();
        }
    }
}
