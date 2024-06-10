import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "./Context/StoreContext";
import { useEffect } from "react";
import apiConnector from "./ApiConnector/connector";
import { getCookie } from "./Utils/Util";

function App() {
  const { setCart } = useStoreContext();
  useEffect(() => {
    const buyerId = getCookie("buyerId");

    async function fetchBasket() {
      if (buyerId) {
        try {
          const response = await apiConnector.Basket.get();
          setCart(response);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchBasket();
  }, [setCart]);
  return (
    <div className="bg-gray-200 dark:bg-gray-900 min-h-screen">
      <NavBar />
      <Outlet />
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
}

export default App;
