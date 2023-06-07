using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication.Migrations
{
    public partial class manually_removed_the_second_fk_order_guid_column : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_OrderModelOrderGuid",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "OrderModelOrderGuid1",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "OrderModelOrderGuid",
                table: "OrderItems");

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
