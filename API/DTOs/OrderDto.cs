using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities.OrderAggragate;

namespace API.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string UserEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; }
        public ShippingAddress ShipToAddress { get; set; }
        public List<OrderItemDto> OrderItems { get; set; }

        public decimal Subtotal { get; set; }

        public decimal DeliveryPrice { get; set; }
        public string Status { get; set; }
        public decimal Total { get { return Subtotal + DeliveryPrice; } }
    }
}