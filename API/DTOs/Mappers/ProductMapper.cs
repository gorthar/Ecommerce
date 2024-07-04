using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs.Mappers
{
    public static class ProductMapper
    {

        public static Product toProduct(this CreateProductDto productDto)
        {
            return new Product
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price,
                PictureUrl = productDto.PictureUrl,
                Type = productDto.Type,
                Brand = productDto.Brand,
                QuantityInStock = productDto.QuantityInStock
            };
        }

    }
}