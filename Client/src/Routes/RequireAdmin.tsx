import { useStoreContext } from "@/Context/useStoreContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAdmin() {
  const { user, setLoggedIn, setCart, setUser } = useStoreContext();
  const location = useLocation();

  if (user?.Role != "Admin") {
    setLoggedIn(false);
    localStorage.removeItem("user");
    setCart(null);
    setUser(null);
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
}
export default RequireAdmin;
