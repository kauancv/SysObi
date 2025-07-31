using SysObiOnline.Models;

namespace SysObiOnline.Repository.Interface
{
    public interface IQuestionInterface
    {
        public Task CreateQuestion(Question question);
        public Task UpdateQuestion(Question question);
        public Task<Question> GetQuestionByName(string name);
        public Task<Question> GetQuestionById(int id);
        public Task<List<string>> GetAllQuestionNamesAsync();


    }
}
