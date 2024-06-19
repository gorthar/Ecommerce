import { useStoreContext } from "@/Context/useStoreContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth() {
  const { user } = useStoreContext();
  const location = useLocation();
  console.log(user);
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
}
export default RequireAuth;
