using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication.Migrations
{
    public partial class create_order_models : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    OrderGuid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.OrderGuid);
                });

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    OrderItemGuid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PartModelPartGuid = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    FK_OrderModelGuid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderModelOrderGuid = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.OrderItemGuid);
                    table.ForeignKey(
                        name: "FK_OrderItemModel_OrderModel_OrderGuid",
                        column: x => x.FK_OrderModelGuid,
                        principalTable: "Orders",
                        principalColumn: "OrderGuid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderModelOrderGuid",
                        column: x => x.OrderModelOrderGuid,
                        principalTable: "Orders",
                        principalColumn: "OrderGuid",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrderItems_Parts_PartModelPartGuid",
                        column: x => x.PartModelPartGuid,
                        principalTable: "Parts",
                        principalColumn: "PartGuid",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_FK_OrderModelGuid",
                table: "OrderItems",
                column: "FK_OrderModelGuid");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderModelOrderGuid",
                table: "OrderItems",
                column: "OrderModelOrderGuid");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_PartModelPartGuid",
                table: "OrderItems",
                column: "PartModelPartGuid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "Orders");
        }
    }
}
