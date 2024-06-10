interface BasketItem {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    type: string;
    brand: string;
  }
  
  interface Basket {
    id: number;
    buyerId: string;
    items: BasketItem[];
  }