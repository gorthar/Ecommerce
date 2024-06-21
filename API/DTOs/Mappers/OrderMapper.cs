using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities.OrderAggragate;
using Microsoft.EntityFrameworkCore;

namespace API.DTOs.Mappers
{
    public static class OrderMapper
    {
        public static IQueryable<OrderDto> ToOrderToDto(this IQueryable<Order> orders)
        {
            return orders.Select(o => new OrderDto
            {
                Id = o.Id,
                UserEmail = o.UserEmail,
                OrderDate = o.OrderDate,
                ShipToAddress = o.ShipToAddress,

                Subtotal = o.Subtotal,
                DeliveryPrice = o.DeliveryPrice,
                Status = o.Status.ToString(),
                OrderItems = o.OrderItems.Select(oi => new OrderItemDto
                {
                    ProductId = oi.ItemOrdered.ProductId,
                    Name = oi.ItemOrdered.Name,
                    PictureUrl = oi.ItemOrdered.PictureUrl,
                    Price = oi.Price,
                    Quantity = oi.Quantity
                }).ToList()
            }).AsNoTracking();
        }
    }
}