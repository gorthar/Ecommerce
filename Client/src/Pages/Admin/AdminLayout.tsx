import { useState } from "react";

import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  function toggleSidebar() {
    setSidebarOpen(true);
    console.log(sidebarOpen);
  }

  return (
    <div className=" flex h-screen overflow-hidden">
      <div
        className={`fixed hover:cursor-pointer inset-0 bg-black top-3 left-3 w-7 h-7 bg-opacity-0 z-50 lg:hidden ${
          !sidebarOpen ? "block" : "hidden"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          toggleSidebar();
        }}
      >
        <div className="absolute top-1 left-0.5 w-6 h-0.5 bg-white transform "></div>
        <div className="absolute top-3 left-0.5 w-6 h-0.5 bg-white transform "></div>
        <div className="absolute top-5 left-0.5 w-6 h-0.5 bg-white transform "></div>
      </div>

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
