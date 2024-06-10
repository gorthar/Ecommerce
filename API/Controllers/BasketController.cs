using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.DTOs.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BasketController(ApplicationDbContext context)
        {
            _context = context;
        }

        private bool BasketExists(int id)
        {
            return _context.Baskets.Any(e => e.Id == id);
        }
        private async Task<Basket> RetriveBasket()
        {
            var buyerId = Request.Cookies["buyerId"];
            return await _context.Baskets
                    .Include(x => x.Items)
                    .ThenInclude(x => x.Product)
                    .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        // GET: api/Basket
        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket basket = await RetriveBasket();

            if (basket == null) return NotFound();
            return Ok(basket.toBasketDto());
        }



        // POST: api/Basket
        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemsToBasket(int productId, int quantity)
        {
            var basket = await RetriveBasket();

            if (basket == null)
            {
                basket = CreateBasket();
            }
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();
            basket.AddItem(productId, quantity);

            var result = await _context.SaveChangesAsync();

            if (result == 0) return BadRequest(new ProblemDetails { Title = "Failed to add item to basket" });

            return CreatedAtRoute("GetBasket", basket.toBasketDto());
        }

        // DELETE: api/Basket
        [HttpDelete]
        public async Task<ActionResult> RemoveItemFromBasket(int productId, int quantity)
        {
            var basket = await _context.Baskets
                .Include(x => x.Items)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);

            if (basket == null) return NotFound();

            basket.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync();

            if (result > 0) return Ok();

            return BadRequest(new ProblemDetails { Title = "Failed to remove item from basket" });
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket
            {
                BuyerId = buyerId
            };
            _context.Baskets.Add(basket);
            return basket;
        }

    }
}