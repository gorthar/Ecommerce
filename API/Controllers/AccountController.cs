using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.DTOs.Mappers;
using API.Entities;
using API.Entities.OrderAggragate;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging;
using NuGet.Common;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly ApplicationDbContext _context;

        public AccountController(ILogger<AccountController> logger, UserManager<User> userManager, TokenService tokenService, ApplicationDbContext context)
        {
            _logger = logger;
            _userManager = userManager;
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDto userDto)
        {
            var user = await _userManager.FindByEmailAsync(userDto.Email);
            if (user == null) return Unauthorized("Invalid email or password");

            var result = await _userManager.CheckPasswordAsync(user, userDto.Password);
            if (!result) return Unauthorized("Invalid email or password");

            var userBasket = await RetriveBasket(user.UserName);
            var anonBasket = await RetriveBasket(Request.Cookies["buyerId"]);
            bool basketWasNull = false;
            if (userBasket == null && anonBasket == null) return Ok(new UserLoggedInDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user)
            });

            if (userBasket == null)
            {
                userBasket = new Basket { BuyerId = user.UserName };
                basketWasNull = true;
            }

            if (anonBasket != null)
            {
                foreach (var item in anonBasket.Items)
                {
                    var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == item.ProductId);
                    if (product == null) continue;
                    if (userBasket.Items.Any(x => x.ProductId == product.Id))
                    {
                        userBasket.Items.FirstOrDefault(x => x.ProductId == product.Id).Quantity += item.Quantity;
                    }
                    else
                    {
                        userBasket.Items.Add(new BasketItem
                        {
                            Product = product,
                            Quantity = item.Quantity
                        });
                    }

                }
                _context.Baskets.Remove(anonBasket);
                if (basketWasNull) _context.Baskets.Add(userBasket);
                else _context.Baskets.Update(userBasket);
                Response.Cookies.Delete("buyerId");
                await _context.SaveChangesAsync();

            }

            var returner = new UserLoggedInDto
            {
                Email = user.Email,
                Basket = userBasket.toBasketDto(),
                Token = await _tokenService.CreateToken(user)
            };


            return Ok(returner);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDto userRegisterDto)
        {
            if (userRegisterDto.Password != userRegisterDto.ConfirmPassword) return BadRequest("Passwords do not match");
            var user = new User
            {
                Email = userRegisterDto.Email,
                UserName = userRegisterDto.Email
            };

            var result = await _userManager.CreateAsync(user, userRegisterDto.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "User");

            return Ok();
        }

        [Authorize]
        [HttpGet("currentuser")]

        public async Task<IActionResult> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            if (user == null) return NotFound();
            var returner = user.toLoggedInUserDto();
            returner.Token = await _tokenService.CreateToken(user);
            var userBasket = await RetriveBasket(user.UserName);
            returner.Basket = userBasket != null ? userBasket.toBasketDto() : null;
            return Ok(returner);
        }

        private async Task<Basket> RetriveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            };

            return await _context.Baskets
                    .Include(x => x.Items)
                    .ThenInclude(x => x.Product)
                    .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        [Authorize]
        [HttpGet("savedAddress")]
        public async Task<ActionResult<UserAddress>> GetSavedAddress()
        {
            var UserAddress = await _userManager.Users
                    .Where(x => x.UserName == User.Identity.Name)
                    .Select(x => x.Address)
                    .FirstOrDefaultAsync();
            return UserAddress;
        }
        [Authorize]
        [HttpPost("saveAddress")]
        public async Task<ActionResult> SaveAddress(ShippingAddress userAddress)
        {
            var user = await _userManager.Users
                    .Include(x => x.Address)
                    .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);
            if (user == null) return NotFound();
            var addressNew = new UserAddress
            {

                FullName = userAddress.FullName,
                Address1 = userAddress.Address1,
                Address2 = userAddress.Address2,
                City = userAddress.City,
                State = userAddress.State,
                PostCode = userAddress.PostCode,
                Country = userAddress.Country
            };
            user.Address = addressNew;
            await _context.SaveChangesAsync();
            return Ok();
        }




    }
}