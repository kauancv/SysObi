using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SysObiOnline.Migrations
{
    /// <inheritdoc />
    public partial class UpdateModelQuestion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Question",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OptionA",
                table: "Question",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OptionB",
                table: "Question",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OptionC",
                table: "Question",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OptionD",
                table: "Question",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OptionE",
                table: "Question",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Phase",
                table: "Question",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Statement",
                table: "Question",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Question");

            migrationBuilder.DropColumn(
                name: "OptionA",
                table: "Question");

            migrationBuilder.DropColumn(
                name: "OptionB",
                table: "Question");

            migrationBuilder.DropColumn(
                name: "OptionC",
                table: "Question");

            migrationBuilder.DropColumn(
                name: "OptionD",
                table: "Question");

            migrationBuilder.DropColumn(
                name: "OptionE",
                table: "Question");

            migrationBuilder.DropColumn(
                name: "Phase",
                table: "Question");

            migrationBuilder.DropColumn(
                name: "Statement",
                table: "Question");
        }
    }
}
