import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChartColumnIncreasing, ChartNoAxesGantt, LibraryBig, Menu } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="flex flex-row gap-1 md:flex-row">
        {/* for mobile screen */}
        <div className="md:hidden mt-5 fixed">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2">
                <ChartNoAxesGantt className="w-6 h-6" />
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="p-4">
              <div>
                <h1 className="text-2xl font-bold cursor-pointer">
                  Admin Panel
                </h1>
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
                  <LibraryBig />{" "}
                  <span className="text-xl font-bold">Courses</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden w-[300px] md:flex flex-row min-h-[90vh] bg-gray-200 dark:bg-slate-800 shadow-2xl p-4 fixed ">
          <div>
            <h1 className="text-2xl font-bold cursor-pointer">Admin Panel</h1>
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
        <main className="md:ml-[300px] ml-6 p-4 w-full">
      <Outlet />
    </main>
       
      </div>
    </>
  );
};

export default Sidebar;
