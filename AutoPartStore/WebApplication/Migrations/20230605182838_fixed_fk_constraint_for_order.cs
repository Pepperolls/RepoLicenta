using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication.Migrations
{
    public partial class fixed_fk_constraint_for_order : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FK_OrderModelGuid",
                table: "OrderItems",
                newName: "FK_OrderGuid");

            migrationBuilder.RenameIndex(
                name: "IX_OrderItems_FK_OrderModelGuid",
                table: "OrderItems",
                newName: "IX_OrderItems_FK_OrderGuid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FK_OrderGuid",
                table: "OrderItems",
                newName: "FK_OrderModelGuid");

            migrationBuilder.RenameIndex(
                name: "IX_OrderItems_FK_OrderGuid",
                table: "OrderItems",
                newName: "IX_OrderItems_FK_OrderModelGuid");
        }
    }
}
