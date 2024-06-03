import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="bg-gray-200 dark:bg-gray-900 min-h-screen">
      <NavBar />
      <Outlet />
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
}

export default App;
