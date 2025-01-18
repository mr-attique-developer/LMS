import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const CreateCourse = () => {
  return (
    <>
      <div className="p-16 w-full overflow-hidden">
        <h1 className="text-2xl font-bold">
          Lets add course, add some basic details for your new course
        </h1>
        <p className="mt-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus
          autem recusandae optio?
        </p>

        <div className="mt-8">
          <Label className="text-md font-semibold">Course Title</Label>
          <Input placeholder="Enter course title" className="p-2 mt-3" />
        </div>
        <div className="mt-8">
          <Label className="text-md font-semibold mb-2">Category</Label>
          <Select >
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="nextjs">Next js </SelectItem>
          <SelectItem value="reactjs">React js</SelectItem>
          <SelectItem value="mongodb">MongoDB</SelectItem>
          <SelectItem value="fsd">Full Stack Development</SelectItem>
          <SelectItem value="msd">MERN Stack Development</SelectItem>
          <SelectItem value="js">Javascript</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        
        </div>
      </div>
    </>
  );
};

export default CreateCourse;
