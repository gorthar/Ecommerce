import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage";
import Contact from "../Pages/Contact";
import Cart from "../Pages/Cart";
import ProductDetails from "../Pages/ProductDetails";
import NotFoundPage from "../Pages/NotFoundPage";
import Checkout from "../Pages/Checkout";
import Login from "@/Pages/Login";
import Register from "@/Pages/Register";
import RequireAuth from "./RequireAuth";
import Orders from "@/Pages/Orders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/checkout",
            element: <Checkout />,
          },
          {
            path: "/orders",
            element: <Orders />,
          },
        ],
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },

      {
        path: "not-found",
        element: <NotFoundPage />,
      },
      {
        path: "*",
        element: <Navigate replace to="/not-found" />,
      },
    ],
  },
]);
