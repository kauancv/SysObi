using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SysObiOnline.Migrations
{
    /// <inheritdoc />
    public partial class AddAdminUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Script para inserir o admin, com uma verificação para não inserir duas vezes.
            migrationBuilder.Sql(@"
                IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'pedroadmin@gmail.com')
                BEGIN
                    INSERT INTO Users (Name, Email, PasswordHash, Role)
                    VALUES (
                        'Administrador',
                        'admin@gmail.com',
                        '$2a$11$AOAE5.Ar9GFOxctkvrCByu2HAPLOyR3xXpdhEQhtnp2P4ElbCyVzG',
                        1
                    );
                END
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Script para remover o admin caso a migration seja revertida.
            migrationBuilder.Sql(@"
                DELETE FROM Users WHERE Email = 'pedroadmin@gmail.com'
            ");
        }
    }
}