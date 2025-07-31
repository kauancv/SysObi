using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SysObiOnline.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUnusedFieldsFromQuizResult : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnswersGiven");

            migrationBuilder.DropColumn(
                name: "AttemptDate",
                table: "QuizResults");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "AttemptDate",
                table: "QuizResults",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "AnswersGiven",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuizResultId = table.Column<int>(type: "int", nullable: false),
                    IsCorrect = table.Column<bool>(type: "bit", nullable: false),
                    Level = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QuestionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnswersGiven", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnswersGiven_QuizResults_QuizResultId",
                        column: x => x.QuizResultId,
                        principalTable: "QuizResults",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AnswersGiven_QuizResultId",
                table: "AnswersGiven",
                column: "QuizResultId");
        }
    }
}
