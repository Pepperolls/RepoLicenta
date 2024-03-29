﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication.Models;

namespace WebApplication.Repositories.Interfaces
{
    public interface IOrderRepository
    {
        Task CreateOrder(OrderModel order);
        Task<OrderModel> GetOrderByGuid(Guid orderGuid);
    }
}
