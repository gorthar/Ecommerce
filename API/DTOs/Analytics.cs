using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class Analytics
    {

        public decimal[] MonthlyRevenue { get; set; }
        public int[] MonthlyOrders { get; set; }
        public int[] MonthlyUsers { get; set; }
        public int[] MonthlyProducts { get; set; }


        public AnalyticsProduct[] TopSellingProducts { get; set; }

    }
}