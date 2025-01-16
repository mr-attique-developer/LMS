import { LogOut, Menu, School2 } from "lucide-react";
import React from "react";
import { DarkMode } from "../DarkMode";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = true;
  const role = "instructor";
  return (
    <>
      {/* Desktop Screen */}
      <div className="flex justify-between items-center h-16 shadow-2xl sticky  right-0 top-0 left-0 w-full z-10 px-4">
        <div className=" items-center space-x-4 hidden md:flex">
          <p>
            <School2 />
          </p>
          <h1 className="text-2xl font-bold">Learning</h1>
        </div>
        <div className=" hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>My Learning</DropdownMenuItem>
                    <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                    <DropdownMenuItem className="flex justify-between">
                      Log Out
                      <span>
                        <LogOut size={18} />
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Button className="w-full">Dashboard</Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-4">
              <Button variant="outline">Login</Button>
              <Button>Signup</Button>
            </div>
          )}
          <div>
            <DarkMode />
          </div>
        </div>
        <div className=" flex justify-between w-full md:hidden">
          <MobileNavbar user={user} role={role} />
        </div>
      </div>
    </>
  );
};

const MobileNavbar = ({ user, role }) => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Learning</h1>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-2">
            <Menu className="w-6 h-6" />
          </button>
        </SheetTrigger>

        <SheetContent className="p-4">
          <nav className="flex flex-col space-y-4">
            {user ? (
              <>
                <div className="p-4 mt-4 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">My Account</h1>
                    <div>
                      <DarkMode />
                    </div>
                  </div>
                  <hr />
                  <p className="text-md">My Learning</p>
                  <p className="text-md">Edit Profile</p>
                  <p className="text-md">Logout</p>
                  <hr />
                  <Button className="w-full">Dashboard</Button>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 mt-7 flex  gap-4">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                  <Button className="w-full">Signup</Button>
                </div>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Navbar;
