import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SingleCourseComponent from "./SingleCourseComponent";
import CourseSkeleton from "./CourseSkeleton";
import { Loader2 } from "lucide-react";

const EditProfile = () => {
  const isLoading = false;
  const enrolledCourses = [1,2,3];
  const [inputData, setInputData] = useState({
    name: "",
    profileImage: "",
  });

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputData);
    setInputData({ name: "", profileImage: "" });
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 p-8">
      <div>
        <h1 className="font-bold text-2xl uppercase mb-6">Profile</h1>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Avatar className="w-24 h-24 md:w-36 md:h-36">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-2 mt-4 md:mt-0">
            <h1 className="text-sm md:text-xl font-bold">
              Name: <span className="text-md font-bold">Attique</span>
            </h1>
            <h1 className="text-sm md:text-xl font-bold">
              Email: <span className="text-md font-bold">Attique@gmail.com</span>
            </h1>
            <h1 className="text-sm md:text-xl font-bold">
              Role: <span className="uppercase text-md font-bold">Instructor</span>
            </h1>
            <div className="p-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        name="name"
                        value={inputData.name}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="profile" className="text-right">
                        Profile
                      </Label>
                      <Input
                        id="profile"
                        name="profileImage"
                        value={inputData.profileImage}
                        onChange={handleChange}
                        type="file"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin w-4 h-4 ml-2" /> Wait Please
                        </>
                      ) : (
                        "Save changes"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="font-semibold text-xl mb-6">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array(6)
                .fill()
                .map((_, i) => <CourseSkeleton key={i} />)
            : enrolledCourses.length === 0
            ? <h1 className="text-center text-xl">No courses enrolled yet</h1>
            : enrolledCourses.map((course) => <SingleCourseComponent key={course.id} />)}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;