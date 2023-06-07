using System;

namespace WebApplication.Models
{
    public class OrderItemModel
    {
        public Guid OrderItemGuid { get; set; }

        public Guid FK_OrderGuid { get; set; }

        public Guid PartModelGuid { get; set; }

        public int Quantity { get; set; }

        public OrderItemModel()
        {
            OrderItemGuid = Guid.NewGuid();
        }

        public OrderItemModel(Guid orderGuid, Guid partModelGuid, int quantity)
        {
            OrderItemGuid = Guid.NewGuid();
            FK_OrderGuid = orderGuid;
            PartModelGuid = partModelGuid;
            Quantity = quantity;
        }
    }
}
