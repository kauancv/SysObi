namespace SysObiOnline.Models
{
    public class QuizResult
    {
        public int Id { get; set; }
        public int UserId { get; set; } 
        public int TotalCorrect { get; set; }
        public int TotalIncorrect { get; set; }
        public Users User { get; set; }
    }
}