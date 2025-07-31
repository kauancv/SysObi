using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SysObiOnline.Models
{
   
    public class Question
    {
        public int Id { get; set; }  
        public string Level { get; set; }
        public string Content { get; set; }
        public string Name { get; set; }
        public string Year { get; set; }
        public string CorrectAnswer { get; set; }
        // enunciado introdutório da questão
        public string Statement { get; set; }
        public string Phase { get; set; }
        // URL opcional para imagem associada à questão
        [Url]
        public string? ImageUrl { get; set; }
        // Alternativas de A a E
        public string OptionA { get; set; }
        public string OptionB { get; set; }
        public string OptionC { get; set; }
        public string OptionD { get; set; }
        public string OptionE { get; set; }
        
    }
}
