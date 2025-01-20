import { LogOut, Menu, School2 } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import {  useLogoutUserMutation} from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  // const user = true;
  const role = "instructor";
  const navigate = useNavigate()
  const {user} = useSelector((state)=> state.auth)
  console.log(user)

//  const {data:userProfileData, refetch} =  useGetUserProfileQuery()  
//  console.log(userProfileData)
const [ logoutUser , {data,  isSuccess, error , isError}] = useLogoutUserMutation()

const handleLogout = async() => {
  await logoutUser()
}

useEffect(()=>{
  if(isSuccess){
    toast.success(data.message || "Logged out successfully")
    navigate("/login")
  }
  if(isError){
    toast.error(error.message || "Something wrong happened while logout")
    navigate("/login")
  }
},[isSuccess, isError, error])
  return (
    <>
      {/* Desktop Screen */}
      <div className="flex justify-between items-center h-16 shadow-2xl sticky  right-0 top-0 left-0 bg-gray-50 dark:text-white dark:bg-black w-full z-40 px-4">
        <Link to={"/"}>
          <div className=" items-center space-x-4 hidden md:flex">
            <p>
              <School2 />
            </p>
            <h1 className="text-2xl font-bold">Learning</h1>
          </div>
        </Link>
        <div className=" hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src= {user?.photoUrl ||"https://github.com/shadcn.png" }/>
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>                   
                      <DropdownMenuItem> <Link to={"/my-learning"}>My Learning</Link></DropdownMenuItem>                    
                      <DropdownMenuItem> <Link to={"/profile"}>Edit Profile</Link></DropdownMenuItem>
                      <DropdownMenuItem className="flex justify-between cursor-pointer" onClick= {handleLogout}>
                      Log Out
                      <span>
                        <LogOut size={18} />
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    {user?.role === "instructor" && (
                   <Link to={"/admin/dashboard"} className="w-full">   <Button  className="w-full"> Dashboard</Button></Link>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-4">
            <Link to={"/login"}> <Button variant="outline" >Login</Button></Link>
            <Link to={"/login"}>  <Button>Signup</Button></Link>
            </div>
          )}
          <div>
            <DarkMode />
          </div>
        </div>
        <div className=" flex justify-between w-full md:hidden">
          <MobileNavbar user={user} role={user?.role}  logout = {handleLogout}/>
        </div>
      </div>
    </>
  );
};

const MobileNavbar = ({ user, role, logout }) => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">
          <Link to={"/"}>Learning</Link>
        </h1>
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
                  <p className="text-md">
                    <Link to={"/my-learning"}>My Learning</Link>
                  </p>
                  <p className="text-md">
                    <Link to={"/profile"}>Edit Profile</Link>
                  </p>
                  <p className="text-md cursor-pointer" onClick={logout}>Logout</p>
                  <hr />
                  {role === "instructor" && (
                   <Link to={"/admin/dashboard"}> <Button className="w-full">Dashboard</Button></Link>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="p-4 mt-7 flex  gap-4">
                <Link to={"/login"}><Button variant="outline" className="w-full" >Login</Button></Link>
                <Link to={"/login"}><Button className="w-full">Signup</Button></Link>
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
