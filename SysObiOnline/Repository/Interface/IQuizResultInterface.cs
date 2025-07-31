using SysObiOnline.Models;

public interface IQuizResultInterface
{
    Task SaveResultAsync(QuizResult result); 
}