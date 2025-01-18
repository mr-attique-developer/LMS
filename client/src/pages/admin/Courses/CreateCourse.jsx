import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {  Loader2 } from "lucide-react";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { toast } from "sonner";

const CreateCourse = () => {
  // const isLoading = false
  const [title,seTitle] = useState("")
  const [category,setCategory] = useState("")
  const navigate = useNavigate()

  const [createCourse, {data, isLoading, error, isError, isSuccess}] = useCreateCourseMutation()
  // console.log(createCourse)

  const handleFormData = async()=>{
    console.log("Title",title)
    console.log("Category",category)
    const data = {title, category}
    await createCourse(data)
  }
  
  useEffect(()=>{
    if(isSuccess){
      toast.success(data.message|| "Course created successful")
      navigate("/admin/courses")
      seTitle("")
      setCategory("")
    }
    if(isError){
      toast.error(error.data.message)
    }
  }, [data, isError, isSuccess, isLoading, error])
  return (
    <>
      <div className="md:p-16 p-2 w-full overflow-hidden">
        <h1 className="text-2xl font-bold">
          Lets add course, add some basic details for your new course
        </h1>
        <p className="mt-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus
          autem recusandae optio?
        </p>

        <div className="mt-8">
          <Label className="text-md font-semibold">Course Title</Label>
          <Input
           placeholder="Enter course title" 
           className="p-2 mt-3"
           name="title"
           value={title}
           onChange={(e) => seTitle(e.target.value)}
           
           />
        </div>
        <div className="mt-8">
          <Label className="text-md font-semibold mb-2">Category</Label>
          <Select value={category} onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="nextjs">Next js </SelectItem>
                <SelectItem value="reactjs">React js</SelectItem>
                <SelectItem value="mongoDB">MongoDB</SelectItem>
                <SelectItem value="FullStackDevelopment">Full Stack Development</SelectItem>
                <SelectItem value="MernStackDevelopment">MERN Stack Development</SelectItem>
                <SelectItem value="javascript">Javascript</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="css">Css</SelectItem>
                <SelectItem value="redux">Redux & Redux toolkit</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3 mt-5">
          <Button variant="outline"> <Link to={"/admin/courses"}>Cancel</Link></Button>
          <Button onClick={handleFormData} disabled={isLoading} >
            {
              isLoading ?
              <>
              <Loader2 className="animate-spin"/> Wait Please
              </> : "Create"
            }
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateCourse;
