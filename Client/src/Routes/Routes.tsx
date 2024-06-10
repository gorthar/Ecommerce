import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage";
import Contact from "../Pages/Contact";
import Cart from "../Pages/Cart";
import ProductDetails from "../Pages/ProductDetails";
import NotFoundPage from "../Pages/NotFoundPage";
import Checkout from "../Pages/Checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
        path: "not-found",
        element: <NotFoundPage />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "*",
        element: <Navigate replace to="/not-found" />,
      },
    ],
  },
]);
