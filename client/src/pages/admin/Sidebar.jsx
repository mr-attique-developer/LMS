import { ChartColumnIncreasing, LibraryBig } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
<div className="flex flex-col md:flex-row">
      <div className="hidden w-[300px] md:flex flex-row h-screen bg-gray-200 shadow-2xl p-4">
        <div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <Link
            to={"dashboard"}
            className="flex items-center space-x-2 mt-4 gap-3"
          >
            <ChartColumnIncreasing />{" "}
            <span className="text-xl font-bold">Dashboard</span>
          </Link>
          <Link
            to={"courses"}
            className="flex items-center space-x-2 mt-4 gap-3"
          >
            <LibraryBig /> <span className="text-xl font-bold">Courses</span>
          </Link>
        </div>
      </div>
      <Outlet />

      </div>
    </>
  );
};

export default Sidebar;
