using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task InitDb(ApplicationDbContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@admin.com"
                };

                await userManager.CreateAsync(admin, "Admin1234!");
                await userManager.AddToRoleAsync(admin, "Admin");

                var user = new User
                {
                    UserName = "user",
                    Email = "user@user.com"
                };

                await userManager.CreateAsync(user, "User1234!");
                await userManager.AddToRoleAsync(user, "User");
            }


            if (context.Products.Any())
            {
                return;
            }
            var products = new List<Product>
            {
                new Product {  Name = "Adidas Men's Ultra Boost 21", Description = "The latest version of the iconic Ultra Boost, designed for comfort and performance.", Price = 180.00m, PictureUrl = "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/429a510e09fe4039ba33ac770135d8be_9366/Ultraboost_21_Shoes_White_FY0377_01_standard.jpg", Type = "Running Shoes", Brand = "Adidas", QuantityInStock = 120, starRating = 4.5},

                new Product {  Name = "Nike Air Max 270 React ENG", Description = "A modern take on the classic Air Max silhouette, featuring Nike's latest foam technology for cushioning.", Price = 150.00m, PictureUrl = "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0b4520d4-f02a-4ba4-bbb0-aabcd939f835/air-max-270-react-eng-shoe-KP30mK.png", Type = "Running Shoes", Brand = "Nike", QuantityInStock = 85, starRating = 4.0},

                new Product {  Name = "Jordan 1 Retro High OG 'Chicago'", Description = "A classic Jordan 1 colorway that pays homage to Michael Jordan's college days at the University of North Carolina.", Price = 225.00m, PictureUrl = "https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/kj11ctakaqzca1hrkbkh/air-jordan-1-retro-chicago-release-date.jpg", Type = "Basketball Shoes", Brand = "Jordan (by Nike)", QuantityInStock = 65, starRating = 4.8},

                new Product { Name = "Puma Ralph Sampson Mid '84", Description = "A retro basketball sneaker inspired by the original design worn by NBA legend Ralph Sampson.", Price = 130.00m, PictureUrl = "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_900,h_900/global/370718/01/sv01/fnd/PNA/fmt/png/Ralph-Sampson-Mid-OG-Sneakers", Type="Basketball Shoes", Brand = "Puma", QuantityInStock = 55, starRating = 4.2},

                new Product { Name = "Under Armour Curry 8 'Path to Greatness'", Description = "Designed for Stephen Curry, featuring Under Armour's Charged Cushioning for high-performance play.", Price = 140.00m, PictureUrl = "https://underarmour.scene7.com/is/image/Underarmour/3024785-111_DEFAULT?rp=standard-30pad%7CpdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=566&hei=708&size=536%2C688", Type = "Basketball Shoes", Brand = "Under Armour", QuantityInStock = 45, starRating = 4.6},

                new Product { Name = "Reebok Club C 'Insta Pump Fury' Retro", Description = "A throwback to the 90s, featuring Reebok's innovative Insta Pump technology for adjustable cushioning.", Price = 110.00m, PictureUrl = "https://media-assets.grailed.com/prd/listing/temp/124e5ca6ff0740b8b9f2549cbfdaa2ec", Type = "Sneakers", Brand = "Reebok", QuantityInStock = 35, starRating = 4.3},

                new Product { Name = "New Balance Fresh Foam Roav v2", Description = "An everyday running shoe with New Balance's Fresh Foam technology for responsive cushioning.", Price = 100.00m, PictureUrl = "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRvnFKlFz1GK7IiuXcfLJlrQbnbhqt8XxPVuXxX1PJoLF9DVjAa1_U7fiOz3hCK6aAGJclfMnzFnSlBJqAV7FdPEdGDzGgqLA", Type = "Running Shoes", Brand = "New Balance", QuantityInStock = 25 , starRating = 4.4},

                new Product { Name = "Asics Gel-Kayano 28", Description = "A stability running shoe designed for runners seeking support and comfort during their runs.", Price = 120.00m, PictureUrl = "https://m.media-amazon.com/images/I/51F-FfhnQGL._AC_SY695_.jpg", Type = "Running Shoes", Brand = "Asics", QuantityInStock = 15 , starRating = 4.1 },

                new Product { Name = "Converse Chuck Taylor All Star II", Description = "A modern twist on the classic Converse All Star, featuring updated materials for durability and comfort.", Price = 70.00m, PictureUrl = "https://converse.ca/media/catalog/product/cache/f9d46213ae1d882c35b397bec3e31308/s/c/sc150143c-prem_001_a_2nd.jpg", Type = "Sneakers", Brand = "Converse", QuantityInStock = 10, starRating = 4.0 },

                new Product { Name = "Salomon Speedcross 5 GTX", Description = "Designed for grip and traction in all conditions, perfect for trail running and outdoor activities.", Price = 160.00m, PictureUrl = "https://m.media-amazon.com/images/I/6177SPRA9+L._AC_SY625_.jpg", Type = "Trail Running Shoes", Brand = "Salomon", QuantityInStock = 5, starRating = 4.7}
            };

            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}
