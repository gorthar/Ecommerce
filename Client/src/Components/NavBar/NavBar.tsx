import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import NavButtons from "./NavButtons";

const NavBar: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  function toggleDarkMode() {
    setDarkMode((prev: boolean) => !prev);
    document.body.classList.toggle("dark");
  }
  useEffect(() => {
    document.body.classList.toggle("dark");
  }, []);

  return (
    <nav className="bg-gray-300 dark:bg-gray-800 text-white dark:text-gray-100 h-[4vh] shadow-lg">
      <div className="flex justify-end h-full items-center max-w-full gap-6">
        <NavButtons />
        <UserMenu />
        <div>
          <button onClick={toggleDarkMode} className="mr-4">
            {darkMode ? (
              <SunIcon className="h-6 w-6 text-gray-900 dark:text-gray-200" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-900 dark:text-gray-200" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
