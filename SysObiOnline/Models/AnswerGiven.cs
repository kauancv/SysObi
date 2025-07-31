namespace SysObiOnline.Models
{
    public class AnswerGiven
    {
        public int Id { get; set; }
        public int QuizResultId { get; set; }
        public QuizResult QuizResult { get; set; }
        public int QuestionId { get; set; }
        public string Level { get; set; }
        public bool IsCorrect { get; set; }
    }

}
