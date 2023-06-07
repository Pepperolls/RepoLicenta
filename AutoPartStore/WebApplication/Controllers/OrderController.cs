using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication.Models;
using WebApplication.Repositories;

namespace WebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpPost("/CreateOrder")]
        public async Task<ActionResult<OrderModel>> CreateOrder([FromBody] OrderModel orderModel)
        {
            foreach (var orderItem in orderModel.OrderItems)
            {
                orderItem.FK_OrderGuid = orderModel.OrderGuid;
            }

            await _orderRepository.CreateOrder(orderModel);

            return CreatedAtAction(nameof(CreateOrder), new { id = orderModel.OrderGuid }, orderModel);
        }

        [HttpPost("/GetOrderByGuid/{orderGuid}")]
        public async Task<ActionResult<OrderModel>> GetOrderByGuid(Guid orderGuid)
        {
            var order = await _orderRepository.GetOrderByGuid(orderGuid);

            return order;
        }
    }
}
