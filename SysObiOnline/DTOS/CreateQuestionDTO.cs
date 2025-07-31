namespace SysObiOnline.DTOS;

public class CreateQuestionDTO
{
    public string Level { get; set; }
    public string Statement { get; set; }
    public string Content { get; set; }
    public string Name { get; set; }
    public string Year { get; set; }
    public string CorrectAnswer { get; set; }
    public string? ImageUrl { get; set; }
    public string OptionA { get; set; }
    public string OptionB { get; set; }
    public string OptionC { get; set; }
    public string OptionD { get; set; }
    public string OptionE { get; set; }
    public string Phase { get; set; } 
}