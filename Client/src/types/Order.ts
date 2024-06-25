export interface ShipToAddress {
    fullName: string;
    address1: string;
    address2: string;
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