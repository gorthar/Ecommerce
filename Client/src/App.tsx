import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  return (
    <div className="bg-gray-200 dark:bg-gray-900 min-h-screen">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
