using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities.OrderAggragate;

namespace API.DTOs
{
    public class CreateOrderDto
    {
        public bool SaveAddress { get; set; }
        public ShippingAddress ShipToAddress { get; set; }

    }
}