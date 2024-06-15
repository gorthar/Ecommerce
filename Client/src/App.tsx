import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "./Context/useStoreContext";
import { useEffect } from "react";
import apiConnector from "./ApiConnector/connector";
import { getCookie } from "./Utils/Util";
import globalRouter from "./globalRouter";

function App() {
  const { setCart, getUser } = useStoreContext();
  const navigate = useNavigate();
  globalRouter.navigate = navigate;
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
  }, []);
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="bg-gray-200 dark:bg-gray-900 min-h-screen">
      <NavBar />
      <Outlet />
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
}

export default App;
