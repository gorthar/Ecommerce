using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AnalyticsProduct
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Revenue { get; set; }
        public int Orders { get; set; }
        public string imageUrl { get; set; }


    }
}