import { CreditCard, LogOut, PlusCircle, User, UserPlus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { useStoreContext } from "@/Context/useStoreContext";
import { useNavigate } from "react-router-dom";

function UserMenu() {
  const { loggedIn, setLoggedIn, user, setCart, setUser } = useStoreContext();
  const navigate = useNavigate();
  function logout() {
    setLoggedIn(false);
    localStorage.removeItem("user");
    setCart(null);
    setUser(null);
    navigate("/");
  }
  if (!loggedIn)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          className="bg-gray-300 hover:bg-blue-600 font-bold px-2 py-1 rounded-lg 
        dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-800 dark:hover:text-white"
        >
          <UserPlus className=" h-6 w-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72 bg-gray-300 dark:bg-gray-700 border-gray-200 border">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate("/login")}>
              <User className="mr-2 h-4 w-4" />
              <span>Login</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/register")}>
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>Register</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-gray-300 hover:bg-blue-600 font-bold dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-700  dark:hover:text-white px-3 py-1 rounded-lg ">
        <User className=" h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 bg-gray-300 dark:bg-gray-700 border-gray-200 border">
        <DropdownMenuLabel className="flex justify-between">
          <span>My Account</span>
          <span className="text-right">{user?.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/orders")}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Orders</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default UserMenu;
