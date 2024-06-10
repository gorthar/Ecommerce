using API.Entities;

namespace API;

public class Basket
{
    public int Id { get; set; }
    public string BuyerId { get; set; }
    public List<BasketItem> Items { get; set; } = new List<BasketItem>();

    public void AddItem(int productId, int quantity = 1)
    {
        var existingItem = Items.FirstOrDefault(x => x.ProductId == productId);
        if (existingItem != null)
        {
            existingItem.Quantity += quantity;
        }
        else
        {
            Items.Add(new BasketItem
            {
                ProductId = productId,
                Quantity = quantity
            });
        }
    }

    public void RemoveItem(int productId, int quantity)
    {
        var item = Items.FirstOrDefault(x => x.ProductId == productId);
        if (item != null)
        {
            if (item.Quantity > quantity)
            {
                item.Quantity -= quantity;
            }
            else
            {
                Items.Remove(item);
            }
        }
    }
}
