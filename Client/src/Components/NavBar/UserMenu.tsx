import {
  CreditCard,
  LogOut,
  PlusCircle,
  Settings,
  User,
  UserPlus,
} from "lucide-react";

import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { useState } from "react";

function UserMenu() {
  const [loggedIn, setLoggedIn] = useState(false);
  if (!loggedIn)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="">
          <Button className="bg-gray-300 hover:bg-blue-600 font-bold dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-800  dark:hover:text-white">
            <UserPlus className=" h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72 bg-gray-300 dark:bg-gray-700 border-gray-200 border">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Sign In</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLoggedIn(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>Sign Up</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="">
        <button className="bg-gray-300 hover:bg-blue-600 font-bold dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-700  dark:hover:text-white px-3 py-1 rounded-lg ">
          <User className=" h-6 w-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 bg-gray-300 dark:bg-gray-700 border-gray-200 border">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setLoggedIn(false)}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default UserMenu;
