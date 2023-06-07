using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication.Migrations
{
    public partial class added_user_details_to_order : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItemModel_OrderModel_OrderGuid",
                table: "OrderItems");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Orders_OrderModelOrderGuid",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_FK_OrderGuid",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "FK_OrderGuid",
                table: "OrderItems");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ZipCode",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserAddress",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserCity",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserCountry",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserEmail",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserFirstName",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserLastName",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserPhoneNumber",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserZipCode",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "OrderModelOrderGuid",
                table: "OrderItems",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OrderModelOrderGuid1",
                table: "OrderItems",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderModelOrderGuid1",
                table: "OrderItems",
                column: "OrderModelOrderGuid1");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItemModel_OrderModel_OrderGuid",
                table: "OrderItems",
                column: "OrderModelOrderGuid",
                principalTable: "Orders",
                principalColumn: "OrderGuid",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Orders_OrderModelOrderGuid1",
                table: "OrderItems",
                column: "OrderModelOrderGuid1",
                principalTable: "Orders",
                principalColumn: "OrderGuid",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItemModel_OrderModel_OrderGuid",
                table: "OrderItems");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Orders_OrderModelOrderGuid1",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_OrderModelOrderGuid1",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ZipCode",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UserAddress",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UserCity",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UserCountry",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UserEmail",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UserFirstName",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UserLastName",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UserPhoneNumber",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UserZipCode",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderModelOrderGuid1",
                table: "OrderItems");

            migrationBuilder.AlterColumn<Guid>(
                name: "OrderModelOrderGuid",
                table: "OrderItems",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "FK_OrderGuid",
                table: "OrderItems",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_FK_OrderGuid",
                table: "OrderItems",
                column: "FK_OrderGuid");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItemModel_OrderModel_OrderGuid",
                table: "OrderItems",
                column: "FK_OrderGuid",
                principalTable: "Orders",
                principalColumn: "OrderGuid",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Orders_OrderModelOrderGuid",
                table: "OrderItems",
                column: "OrderModelOrderGuid",
                principalTable: "Orders",
                principalColumn: "OrderGuid",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
