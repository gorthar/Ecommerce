import { Link } from "react-router-dom";
import CartButton from "./CartButton";
import { useStoreContext } from "@/Context/useStoreContext";

function NavButtons() {
  const selectedStyle =
    "text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors duration-300 dark:hover:bg-blue-700 dark:text-gray-300 dark:hover:text-gray-100 font-semibold ";
  const { user } = useStoreContext();

  return (
    <div className="flex justify-center items-center gap-4">
      <Link to="/" className={selectedStyle}>
        Home
      </Link>
      <Link to="/contact" className={selectedStyle}>
        Contact-Us
      </Link>
      {user?.Role == "Admin" ? (
        <Link to="/admin/dashboard" className={selectedStyle}>
          Admin Panel
        </Link>
      ) : null}

      <Link to="/cart" className={selectedStyle}>
        <CartButton />
      </Link>
    </div>
  );
}
export default NavButtons;
