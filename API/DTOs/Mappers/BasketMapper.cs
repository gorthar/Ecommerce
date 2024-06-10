using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs.Mappers
{
    public static class BasketMapper
    {
        public static BasketDto toBasketDto(this Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(x => x.toBasketItemDto()).OfType<BasketItemDto>().ToList()
            };


        }
        public static BasketItemDto toBasketItemDto(this BasketItem basketItem)
        {
            return new BasketItemDto
            {
                ProductId = basketItem.ProductId,
                ProductName = basketItem.Product.Name,
                Price = basketItem.Product.Price,
                Quantity = basketItem.Quantity,
                PictureUrl = basketItem.Product.PictureUrl,
                Type = basketItem.Product.Type,
                Brand = basketItem.Product.Brand
            };
        }
    }
}