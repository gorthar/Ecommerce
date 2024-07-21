import { createContext, useState } from "react";
import apiConnector from "../ApiConnector/connector";
import { User } from "@/types/User";
import { JwtPayload, jwtDecode } from "jwt-decode";

interface StoreContextValue {
  cart: Basket | null;
  setCart: (basket: Basket | null) => void;
  removeItem: (productId: string, quantity: number) => void;
  addOneToCart: (productId: string) => void;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  saveUser: (user: User) => void;
  getUser: () => Promise<User | null>;
}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Basket | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

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

  function saveUser(newUser: User | null) {
    setUser(newUser);
    setLoggedIn(!!newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  async function getUser() {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const newUser = await apiConnector.Account.currentUser();
      console.log(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      const decodedToken = jwtDecode<JwtPayload>(newUser.token);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userRole = (decodedToken as any)[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
      const userWithRole = { ...newUser, Role: userRole };
      setUser(userWithRole as User);
      setLoggedIn(true);
      setCart(newUser.basket);
    }
    if (user) return user;
    return null;
  }

  return (
    <StoreContext.Provider
      value={{
        cart,
        setCart,
        removeItem,
        addOneToCart,
        loggedIn,
        setLoggedIn,
        user,
        setUser,
        saveUser,
        getUser,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
