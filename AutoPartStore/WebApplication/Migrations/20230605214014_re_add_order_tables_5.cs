using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication.Migrations
{
    public partial class re_add_order_tables_5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    OrderGuid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    UserEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserFirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserLastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserCountry = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserCity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserZipCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserPhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true)
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
                    FK_OrderGuid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PartModelGuid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    OrderModelOrderGuid = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.OrderItemGuid);
                    table.ForeignKey(
                        name: "FK_OrderItemModel_OrderModel_OrderGuid",
                        column: x => x.FK_OrderGuid,
                        principalTable: "Orders",
                        principalColumn: "OrderGuid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderModelOrderGuid",
                        column: x => x.OrderModelOrderGuid,
                        principalTable: "Orders",
                        principalColumn: "OrderGuid",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_FK_OrderGuid",
                table: "OrderItems",
                column: "FK_OrderGuid");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderModelOrderGuid",
                table: "OrderItems",
                column: "OrderModelOrderGuid");
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
