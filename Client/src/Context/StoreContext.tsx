import { createContext, useContext, useState } from "react";
import apiConnector from "../ApiConnector/connector";

interface StoreContextValue {
  cart: Basket | null;
  setCart: (basket: Basket | null) => void;
  removeItem: (pruductId: string, quantity: number) => void;
  addOneToCart: (productId: string) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
);

export function useStoreContext() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
}
export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Basket | null>(null);

  function removeItem(productId: string, quantity: number) {
    if (!cart) return;
    apiConnector.Basket.remove(productId, quantity).then(() => {
      setCart((prevCart) => {
        if (!prevCart) return null;
        return {
          ...prevCart,
          items: prevCart.items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: i.quantity - quantity }
              : i
          ),
        };
      });
    });
  }

  function addOneToCart(productId: string) {
    apiConnector.Basket.add(productId).then((response) => {
      setCart(response);
    });
  }

  return (
    <StoreContext.Provider value={{ cart, setCart, removeItem, addOneToCart }}>
      {children}
    </StoreContext.Provider>
  );
}
