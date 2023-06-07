using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using WebApplication.Models;

namespace WebApplication.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AutoPartsContext _dbContext;

        public OrderRepository(AutoPartsContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateOrder(OrderModel order)
        {
            _dbContext.Orders.Add(order);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<OrderModel> GetOrderByGuid(Guid orderGuid)
        {
            var order = await _dbContext.Orders
                .Include(c => c.OrderItems)
                .FirstOrDefaultAsync(c => c.OrderGuid == orderGuid);
            return order;
        }
    }
}
