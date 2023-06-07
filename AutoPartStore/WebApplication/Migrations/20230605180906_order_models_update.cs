using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication.Migrations
{
    public partial class order_models_update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Parts_PartModelPartGuid",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_PartModelPartGuid",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "PartModelPartGuid",
                table: "OrderItems");

            migrationBuilder.AddColumn<Guid>(
                name: "PartModelGuid",
                table: "OrderItems",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PartModelGuid",
                table: "OrderItems");

            migrationBuilder.AddColumn<Guid>(
                name: "PartModelPartGuid",
                table: "OrderItems",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_PartModelPartGuid",
                table: "OrderItems",
                column: "PartModelPartGuid");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Parts_PartModelPartGuid",
                table: "OrderItems",
                column: "PartModelPartGuid",
                principalTable: "Parts",
                principalColumn: "PartGuid",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
