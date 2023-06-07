using System;
using System.Collections.Generic;

namespace WebApplication.Models
{
    public class OrderModel
    {
        public Guid OrderGuid { get; set; }

        public List<OrderItemModel> OrderItems { get; set; }

        public decimal TotalPrice { get; set; }
        public string UserEmail { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string UserCountry { get; set; }
        public string UserCity { get; set; }
        public string UserZipCode { get; set; }
        public string UserAddress { get; set; }
        public string UserPhoneNumber { get; set; }


        public OrderModel()
        {
            OrderGuid = Guid.NewGuid();
        }
    }

}
