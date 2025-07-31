using System.ComponentModel.DataAnnotations;

namespace SysObiOnline.Models
{
    public class Report
    {
        [Required]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int Questions { get; set; }
        public int Errors { get; set; }
        public int Accepts { get; set; }
    }
}
