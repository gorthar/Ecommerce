using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities.OrderAggragate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnalyticsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AnalyticsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Analytics>> GetAnalytics()
        {
            var analytics = new Analytics();
            var monthlyRevenue = new decimal[12];
            var monthlyOrders = new int[12];
            var monthlyUsers = new int[12];
            var monthlyProducts = new int[12];

            var topSellingProducts = new List<AnalyticsProduct>();



            monthlyProducts = await GetMonthlyProductCount();


            monthlyRevenue = await GetMonthlyRevenue();

            monthlyUsers = await GetMonthlyUserCount();

            topSellingProducts = await GetTopSellingProducts();

            monthlyOrders = await GetMonthlyOrderCount();




            analytics.MonthlyRevenue = monthlyRevenue;
            analytics.MonthlyOrders = monthlyOrders;
            analytics.MonthlyUsers = monthlyUsers;
            analytics.MonthlyProducts = monthlyProducts;

            analytics.TopSellingProducts = topSellingProducts.ToArray();

            return Ok(analytics);
        }
        private async Task<decimal[]> GetMonthlyRevenue()
        {
            var year = DateTime.Now.Year;
            var orders = await _context.Set<Order>()
                .Where(o => o.OrderDate.Year == year)
                .ToListAsync();

            // Group the orders by month and calculate the total revenue for each month
            var revenueData = orders
                .GroupBy(o => o.OrderDate.Month)
                .Select(g => new
                {
                    Month = g.Key,
                    TotalRevenue = g.Sum(o => o.GetTotal())
                })
                .ToList();

            var monthlyRevenueArray = new decimal[12];
            foreach (var revenue in revenueData)
            {
                monthlyRevenueArray[revenue.Month - 1] = revenue.TotalRevenue;
            }

            return monthlyRevenueArray;
        }

        private async Task<int[]> GetMonthlyProductCount()
        {
            var year = DateTime.Now.Year;
            var monthlyProducts = await _context.Products
                .Where(p => p.DateCreated.Year == year)
                .GroupBy(p => p.DateCreated.Month)
                .Select(g => new { Month = g.Key, Products = g.Count() })
                .ToListAsync();
            var monthlyProductsArray = new int[12];
            foreach (var product in monthlyProducts)
            {
                monthlyProductsArray[product.Month - 1] = product.Products;
            }

            return monthlyProductsArray;
        }

        private async Task<int[]> GetMonthlyUserCount()
        {
            var year = DateTime.Now.Year;
            var monthlyUsers = await _context.Users
                .Where(u => u.CreatedAt.Year == year)
                .GroupBy(u => u.CreatedAt.Month)
                .Select(g => new { Month = g.Key, Users = g.Count() })
                .ToListAsync();
            var monthlyUsersArray = new int[12];
            foreach (var user in monthlyUsers)
            {
                // Subtract 1 to convert 1-based month to 0-based index
                monthlyUsersArray[user.Month - 1] = user.Users;
            }

            return monthlyUsersArray;
        }

        private async Task<List<AnalyticsProduct>> GetTopSellingProducts()
        {
            var topSellingProducts = await _context.Orders
                .SelectMany(o => o.OrderItems)
                .GroupBy(oi => oi.ItemOrdered.ProductId)
                .Select(g => new { ProductId = g.Key, Orders = g.Sum(oi => oi.Quantity), Name = g.Select(oi => oi.ItemOrdered.Name).FirstOrDefault(), Price = g.Select(oi => oi.Price).FirstOrDefault(), imageUrl = g.Select(oi => oi.ItemOrdered.PictureUrl).FirstOrDefault() })
                .OrderByDescending(g => g.Orders)
                .Take(5)
                .ToListAsync();

            var products = new List<AnalyticsProduct>();
            foreach (var product in topSellingProducts)
            {
                //var productItem = await _context.Products.FindAsync(product.ProductId);
                products.Add(new AnalyticsProduct
                {
                    Id = product.ProductId, //productItem.Id,
                    Name = product.Name,
                    Orders = product.Orders,
                    Revenue = product.Orders * product.Price,
                    imageUrl = product.imageUrl
                });
            }

            return products;
        }

        private async Task<int[]> GetMonthlyOrderCount()
        {
            var year = DateTime.Now.Year;
            var monthlyOrders = await _context.Orders
                .Where(o => o.OrderDate.Year == year)
                .GroupBy(o => o.OrderDate.Month)
                .Select(g => new { Month = g.Key, Orders = g.Count() })
                .ToListAsync();

            var monthlyOrdersArray = new int[12];
            foreach (var order in monthlyOrders)
            {
                // Subtract 1 to convert 1-based month to 0-based index
                monthlyOrdersArray[order.Month - 1] = order.Orders;
            }

            return monthlyOrdersArray;
        }




    }
}