import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Loader2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const UpdateCoursePage = () => {
  let course = true;
  let isLoading = false;
  return (
    <div className="md:p-16 p-2 mt-4 w-full">
      <div className="flex justify-between items-center ">
        <h1 className="md:text-xl md:font-bold font-medium text-sm   ">
          Add detail information regarding course
        </h1>
        <div>
          <h1 className="hover:text-blue-500 hover:underline  text-sm md:text-xl">
            {" "}
            <Link to={"lecture"}> Go to Lecture Page</Link>
          </h1>
        </div>
      </div>

      {/* Update course form  */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-8 md:flex-row justify-between items-center">
              <div>
                <CardTitle>Basic Infomation</CardTitle>
                <CardDescription className="text-xs md:text-base">
                  Make Changes to your course here. And click save when you'r
                  done
                </CardDescription>
              </div>
              <div className="sm:flex-row flex-col flex gap-3 ">
                <Button variant="outline">
                  {course ? "Unpublish " : "Publish"}
                </Button>
                <Button>Remove Course</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Title</Label>
              <Input className="p-2 " placeholder="Enter course title" />
            </div>
            <div>
              <Label className="mt-3">Subtitle</Label>
              <Input className="p-2 " placeholder="Enter course subtitle" />
            </div>
            <div>
              <Label className="mt-3">Descrption</Label>
              <RichTextEditor />
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
              <div>
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="nextjs">Next js </SelectItem>
                      <SelectItem value="reactjs">React js</SelectItem>
                      <SelectItem value="mongoDB">MongoDB</SelectItem>
                      <SelectItem value="FullStackDevelopment">
                        Full Stack Development
                      </SelectItem>
                      <SelectItem value="MernStackDevelopment">
                        MERN Stack Development
                      </SelectItem>
                      <SelectItem value="javascript">Javascript</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="css">Css</SelectItem>
                      <SelectItem value="redux">
                        Redux & Redux toolkit
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Course Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Course Level</SelectLabel>
                      <SelectItem value="Beginner">Beginner </SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advance">Advance</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  className="p-2 "
                  placeholder="Enter course price"
                  type="number"
                />
              </div>
            </div>
            <div className="mt-3">
                <Label>Course Thumbnail</Label>
                <Input type="file" className="md:w-[250px] "/>
            </div>
            <div className="mt-3 flex items-center gap-2">
                <Button variant="outline"> Cancel</Button>
                <Button  disabled={isLoading}> {
                    isLoading ?
                     <>
                     <Loader2 className="animate-spin" /> Wait Please
                    </>: "Save"
            }</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdateCoursePage;
