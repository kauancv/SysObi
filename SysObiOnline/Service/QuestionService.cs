using Microsoft.EntityFrameworkCore;
using SysObiOnline.Data;
using SysObiOnline.DTOS;
using SysObiOnline.Models;
using SysObiOnline.Repository.Interface;

namespace SysObiOnline.Service
{
    public class QuestionService
    {
        private readonly AppDbContext _context;

        private readonly IQuestionInterface _questionRepository;
        public QuestionService(IQuestionInterface questionRepository, AppDbContext context)
        {
            _questionRepository = questionRepository;
            _context = context;
        }

        public async Task<Question> CreateQuestion(CreateQuestionDTO dto)
        {
            var newquestion = new Question
            {
                Name = dto.Name,
                Level = dto.Level,
                Content = dto.Content,
                Year = dto.Year,
                CorrectAnswer = dto.CorrectAnswer,
                Statement = dto.Statement,
                OptionA = dto.OptionA,
                OptionB = dto.OptionB,
                OptionC = dto.OptionC,
                OptionD = dto.OptionD,
                OptionE = dto.OptionE,
                ImageUrl = dto.ImageUrl,
                Phase = dto.Phase
            };

            await _questionRepository.CreateQuestion(newquestion);

            return newquestion;
        }
        public async Task<Question> GetByName(string name)
        {
            if (string.IsNullOrEmpty(name)) throw new ArgumentNullException("nome nulo ou vazio");
            var getname =  await _questionRepository.GetQuestionByName(name);
            return getname;
        }

        public async Task<Question> UpdateQuestion(string name, Question newData)
        {
            var existingQuestion = await _questionRepository.GetQuestionByName(name);
            if (existingQuestion == null)
                throw new ArgumentNullException("Questão não encontrada!");

            existingQuestion.Name = newData.Name;
            existingQuestion.Level = newData.Level;
            existingQuestion.Content = newData.Content;

            await _questionRepository.UpdateQuestion(existingQuestion);
            return existingQuestion;
        }

        public async Task<List<string>> GetAllQuestionNamesAsync()
        {
            return await _questionRepository.GetAllQuestionNamesAsync();
        }
        
        public async Task<List<Question>> GetFilteredQuestions(string level, string year, string phase)
        {
            var filteredQuestions = await _context.Question
                .Where(q => q.Level == level && q.Year == year && q.Phase == phase)
                .ToListAsync();

            return filteredQuestions; 
        }


    }
}
