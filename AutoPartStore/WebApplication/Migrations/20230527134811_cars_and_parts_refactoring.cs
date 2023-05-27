using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication.Migrations
{
    public partial class cars_and_parts_refactoring : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Parts_Cars_CarModelId",
                table: "Parts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Parts",
                table: "Parts");

            migrationBuilder.DropIndex(
                name: "IX_Parts_CarModelId",
                table: "Parts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cars",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "PartModelId",
                table: "Parts");

            migrationBuilder.DropColumn(
                name: "CarModelId",
                table: "Parts");

            migrationBuilder.DropColumn(
                name: "CarModelId",
                table: "Cars");

            migrationBuilder.AddColumn<Guid>(
                name: "PartGuid",
                table: "Parts",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "FK_CarGuid",
                table: "Parts",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "CarGuid",
                table: "Cars",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Parts",
                table: "Parts",
                column: "PartGuid");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cars",
                table: "Cars",
                column: "CarGuid");

            migrationBuilder.CreateIndex(
                name: "IX_Parts_FK_CarGuid",
                table: "Parts",
                column: "FK_CarGuid");

            migrationBuilder.AddForeignKey(
                name: "FK_PartModel_CarModel_CarGuid",
                table: "Parts",
                column: "FK_CarGuid",
                principalTable: "Cars",
                principalColumn: "CarGuid",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PartModel_CarModel_CarGuid",
                table: "Parts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Parts",
                table: "Parts");

            migrationBuilder.DropIndex(
                name: "IX_Parts_FK_CarGuid",
                table: "Parts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cars",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "PartGuid",
                table: "Parts");

            migrationBuilder.DropColumn(
                name: "FK_CarGuid",
                table: "Parts");

            migrationBuilder.DropColumn(
                name: "CarGuid",
                table: "Cars");

            migrationBuilder.AddColumn<int>(
                name: "PartModelId",
                table: "Parts",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "CarModelId",
                table: "Parts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CarModelId",
                table: "Cars",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Parts",
                table: "Parts",
                column: "PartModelId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cars",
                table: "Cars",
                column: "CarModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Parts_CarModelId",
                table: "Parts",
                column: "CarModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Parts_Cars_CarModelId",
                table: "Parts",
                column: "CarModelId",
                principalTable: "Cars",
                principalColumn: "CarModelId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
