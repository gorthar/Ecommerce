export interface ShipToAddress {
    fullName: string;
    adress1: string;
    adress2: string;
    city: string;
    state: string;
    postCode: string;
    country: string;
  }
  
  export interface OrderItem {
    productId: number;
    name: string;
    pictureUrl: string;
    price: number;
    quantity: number;
  }
  
  export interface Order {
    id: number;
    userEmail: string;
    orderDate: string;
    shipToAddress: ShipToAddress;
    orderItems: OrderItem[];
    subtotal: number;
    deliveryPrice: number;
    status: string;
    total: number;
  }

  export interface CreateOrder {
    shipToAddress: ShipToAddress;
    saveAddress: boolean;
  }