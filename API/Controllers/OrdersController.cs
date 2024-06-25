using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.DTOs.Mappers;
using API.Entities;
using API.Entities.OrderAggragate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public OrdersController(ApplicationDbContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await _context.Orders
                .ToOrderToDto()
                .Where(o => o.UserEmail == User.Identity.Name)
                .ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrderById")]
        public async Task<ActionResult<OrderDto>> GetOrderById(int id)
        {
            return await _context.Orders
                .ToOrderToDto()
                .Where(o => o.Id == id && o.UserEmail == User.Identity.Name)
                .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto createOrderDto)
        {
            var basket = await _context.Baskets
                .RetriveBasketWithItems(User.Identity.Name)
                .FirstOrDefaultAsync();

            if (basket == null || basket.Items.Count == 0)
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "Basket is empty",
                    Detail = "Basket is empty, please add items to the basket before creating an order"
                });
            }

            var items = new List<OrderItems>();
            foreach (var item in basket.Items)
            {
                var productItem = await _context.Products.FindAsync(item.ProductId);
                var itemOrdered = new ProductItemOrdered
                {
                    ProductId = productItem.Id,
                    Name = productItem.Name,
                    PictureUrl = productItem.PictureUrl
                };
                var orderItem = new OrderItems
                {
                    ItemOrdered = itemOrdered,
                    Price = productItem.Price,
                    Quantity = item.Quantity
                };
                items.Add(orderItem);
                productItem.QuantityInStock -= item.Quantity;
            }

            var subTotal = items.Sum(i => i.Price * i.Quantity);
            var deliveryFee = subTotal > 100 ? 0 : 18;
            var order = new Order
            {
                UserEmail = User.Identity.Name,
                OrderItems = items,
                Subtotal = subTotal,
                DeliveryPrice = deliveryFee,
                ShipToAddress = createOrderDto.ShipToAddress
            };
            _context.Orders.Add(order);
            _context.Baskets.Remove(basket);

            if (createOrderDto.SaveAddress)
            {
                var user = await _context.Users
                    .Include(u => u.Address)
                    .FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
                var addressNew = new UserAddress
                {

                    FullName = createOrderDto.ShipToAddress.FullName,
                    Address1 = createOrderDto.ShipToAddress.Address1,
                    Address2 = createOrderDto.ShipToAddress.Address2,
                    City = createOrderDto.ShipToAddress.City,
                    State = createOrderDto.ShipToAddress.State,
                    PostCode = createOrderDto.ShipToAddress.PostCode,
                    Country = createOrderDto.ShipToAddress.Country
                };
                user.Address = addressNew;
                _context.Users.Update(user);
            }

            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return CreatedAtRoute("GetOrderById", new { id = order.Id }, order.Id);
            }

            return BadRequest(new ProblemDetails
            {
                Title = "Order creation failed",
                Detail = "Order creation failed, please try again"
            });

        }

    }
}