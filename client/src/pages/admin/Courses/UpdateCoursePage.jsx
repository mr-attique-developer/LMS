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
import {
  useUpdateCreaterCourseMutation,
} from "@/features/api/courseApi";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const UpdateCoursePage = () => {
  let course = true;
  const navigate = useNavigate();
  // let isLoading = false;
  const params = useParams();
  const courseId = params.courseId;
  // console.log(courseId);
  const [updateCreaterCourse, { data, isError, isLoading, isSuccess, error }] =
    useUpdateCreaterCourseMutation();
    console.log(data)
  const [inputData, setInputData] = useState({
    title: "",
    subTitle: "",
    description: "",
    category: "",
    level: "",
    price: "",
    courseThumbnail: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (value) => {
    setInputData({
      ...inputData,
      category: value,
    });
  };

  const handleLevelChange = (value) => {
    setInputData({
      ...inputData,
      level: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInputData({ ...inputData, courseThumbnail: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCourseUpdateSubmit = async () => {
    console.log("clicked")
    const formData = new FormData();
    formData.append("title", inputData.title);
    formData.append("subTitle", inputData.subTitle);
    formData.append("description", inputData.description);
    formData.append("category", inputData.category);
    formData.append("level", inputData.level);
    formData.append("price", inputData.price);
    formData.append("courseThumbnail", inputData.courseThumbnail);
    console.log(formData)
    console.log(inputData)
    await updateCreaterCourse({courseData: formData, courseId });
  };

  console.log(inputData)

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course updated successful");
      navigate("/admin/courses")
    }
    if (isError) {
      toast.error(error.data.message || "Something went wrong");
    }
  }, [isSuccess, isError, data, error, isLoading]);

  return (
    <div className="md:p-16 p-2 mt-4 w-full">
      <div className="flex justify-between items-center ">
        <h1 className="md:text-xl md:font-bold font-medium text-sm">
          Add detail information regarding course
        </h1>
        <div>
          <h1 className="hover:text-blue-500 hover:underline text-sm md:text-xl">
            <Link to={"lecture"}> Go to Lecture Page</Link>
          </h1>
        </div>
      </div>

      {/* Update course form */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-8 md:flex-row justify-between items-center">
              <div>
                <CardTitle>Basic Infomation</CardTitle>
                <CardDescription className="text-xs md:text-base">
                  Make Changes to your course here. And click save when you're
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
              <Input
                className="p-2"
                placeholder="Enter course title"
                name="title"
                value={inputData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mt-3">Subtitle</Label>
              <Input
                className="p-2"
                placeholder="Enter course subtitle"
                value={inputData.subTitle}
                name="subTitle"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mt-3">Description</Label>
              <RichTextEditor
                inputData={inputData}
                setInputData={setInputData}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
              <div>
                <Label>Category</Label>
                <Select onValueChange={handleCategoryChange}>
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
                <Select onValueChange={handleLevelChange}>
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
                  className="p-2"
                  placeholder="Enter course price"
                  type="number"
                  name="price"
                  value={inputData.price}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-3">
              <Label>Course Thumbnail</Label>
              <Input
                type="file"
                accept="image/*"
                className="md:w-[250px]"
                onChange={handleFileChange}
              />
              <div>
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="course thumbnail"
                    className="w-20 h-20 object-cover mt-2"
                  />
                )}
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Link to={"/admin/courses"}>
                <Button variant="outline"> Cancel</Button>
              </Link>
              <Button disabled={isLoading} onClick={handleCourseUpdateSubmit}>
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" /> Wait Please
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdateCoursePage;
