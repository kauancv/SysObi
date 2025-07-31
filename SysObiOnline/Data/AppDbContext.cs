using Microsoft.EntityFrameworkCore;
using SysObiOnline.Models;

namespace SysObiOnline.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        
        public DbSet<Users> Users { get; set; }
        public DbSet<Question> Question { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<QuizResult> QuizResults { get; set; }

    }
}