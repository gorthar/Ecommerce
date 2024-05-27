using API.Entities;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void InitDb(ApplicationDbContext context) {
            if (context.Products.Any())
            {
                return;
            }
            var products = new List<Product>
            {
                new Product {  Name = "Adidas Men's Ultra Boost 21", Description = "The latest version of the iconic Ultra Boost, designed for comfort and performance.", Price = 180.00m, PictureUrl = "http://example.com/adidas-ultra-boost-21.jpg", Type = "Running Shoes", Brand = "Adidas", QuantityInStock = 120 },
                new Product {  Name = "Nike Air Max 270 React ENG", Description = "A modern take on the classic Air Max silhouette, featuring Nike's latest foam technology for cushioning.", Price = 150.00m, PictureUrl = "http://example.com/nike-air-max-270-react-eng.jpg", Type = "Running Shoes", Brand = "Nike", QuantityInStock = 85 },
                new Product {  Name = "Jordan 1 Retro High OG 'Chicago'", Description = "A classic Jordan 1 colorway that pays homage to Michael Jordan's college days at the University of North Carolina.", Price = 225.00m, PictureUrl = "http://example.com/jordan-1-retro-high-og-chicago.jpg", Type = "Basketball Shoes", Brand = "Jordan (by Nike)", QuantityInStock = 65 },
                new Product { Name = "Puma Ralph Sampson Mid '84", Description = "A retro basketball sneaker inspired by the original design worn by NBA legend Ralph Sampson.", Price = 130.00m, PictureUrl = "http://example.com/puma-ralph-sampson-mid-84.jpg", Type = "Basketball Shoes", Brand = "Puma", QuantityInStock = 55 },
                new Product { Name = "Under Armour Curry 8 'Path to Greatness',", Description = "Designed for Stephen Curry, featuring Under Armour's Charged Cushioning for high-performance play.", Price = 140.00m, PictureUrl = "http://example.com/under-armour-curry-8-path-to-greatness.jpg", Type = "Basketball Shoes", Brand = "Under Armour", QuantityInStock = 45 },
                new Product { Name = "Reebok Club C 'Insta Pump Fury' Retro", Description = "A throwback to the 90s, featuring Reebok's innovative Insta Pump technology for adjustable cushioning.", Price = 110.00m, PictureUrl = "http://example.com/reebok-club-c-insta-pump-fury-retro.jpg", Type = "Sneakers", Brand = "Reebok", QuantityInStock = 35 },
                new Product { Name = "New Balance Fresh Foam Roav v2", Description = "An everyday running shoe with New Balance's Fresh Foam technology for responsive cushioning.", Price = 100.00m, PictureUrl = "http://example.com/new-balance-fresh-foam-roav-v2.jpg", Type = "Running Shoes", Brand = "New Balance", QuantityInStock = 25 },
                new Product { Name = "Asics Gel-Kayano 28", Description = "A stability running shoe designed for runners seeking support and comfort during their runs.", Price = 120.00m, PictureUrl = "http://example.com/asics-gel-kayano-28.jpg", Type = "Running Shoes", Brand = "Asics", QuantityInStock = 15 },
                new Product { Name = "Converse Chuck Taylor All Star II", Description = "A modern twist on the classic Converse All Star, featuring updated materials for durability and comfort.", Price = 70.00m, PictureUrl = "http://example.com/converse-chuck-taylor-all-star-ii.jpg", Type = "Sneakers", Brand = "Converse", QuantityInStock = 10 },
                new Product { Name = "Salomon Speedcross 5 GTX", Description = "Designed for grip and traction in all conditions, perfect for trail running and outdoor activities.", Price = 160.00m, PictureUrl = "http://example.com/salomon-speedcross-5-gtx.jpg", Type = "Trail Running Shoes", Brand = "Salomon", QuantityInStock = 5 }
            };

            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}
