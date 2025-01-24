import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePurchasedCoursesDetailsWithStatusQuery } from "@/features/api/coursePurchaseApi";
import { BadgeInfo, Info, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetails = () => {
  const navigate = useNavigate()
  const params = useParams()
  const courseId = params.courseId
  const {data, isLoading, error } = usePurchasedCoursesDetailsWithStatusQuery(courseId)
  if(isLoading) return <div>Loading...</div>
  if(error) return <div>Error: {error.data.message}</div>

  const {course, purchase} = data

  const handleNavigateToCourseProgressPage = () => {
      if(purchase){
        navigate(`/course-progress/${courseId}`)
    }
  }
  return (
    <div className="w-full overflow-x-hidden">
      <div className="min-h-60 bg-blue-700">
        <div className="container mx-auto p-8 text-left">
          <h1 className="capitalize text-xl md:text-5xl font-bold my-3">
           {course?.title}
          </h1>
          <p className="capitalize text-sm md:text-base">
            {course?.subTitle}
          </p>
          <p className="capitalize text-sm md:text-base ">
            Created by{" "}
            <span className="underline text-slate-700 my-3 cursor-pointer">
              {course?.creater?.username}
            </span>
          </p>

          <div className="flex items-center gap-1 text-sm md:text-base ">
            <BadgeInfo className="" />
            <p>Last update <span>{course?.createdAt.split("T")[0]}</span></p>
          </div>
          <p className="text-xs md:text-base">Student Enrolled: <span>{course.enrolledStudents.length}</span></p>
        </div>
      </div>

      <div className="container mx-auto mt-4 px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
          <div className="w-full md:w-3/5">
            <h1 className="text-3xl font-bold my-3">Description</h1>
            <p className="text-wrap" dangerouslySetInnerHTML={{__html: course?.description}}/>
            <div className="my-5">
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                  <CardDescription>{course?.lectures?.length}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {course?.lectures
                    .map((lecture, i) => (
                      <div className="flex items-center gap-3" key={i}>
                        <span>{true ? <PlayCircle /> : <Lock />}</span>
                        <p>{lecture?.title}</p>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="w-full md:w-1/3 ">
            <Card>
              <CardContent className="p-4 flex flex-col">
                <div className=" w-full aspect-video mb-4">
                 <ReactPlayer
                 width={"100%"}
                  height={"100%"}
                  url={course?.lectures[0].videoUrl}
                  controls={true}
                 />
                </div>
                <h1>{course?.lectures[0]?.title}</h1>

                <Separator className="my-4" />
              </CardContent>
              <CardFooter>
                {purchase ? (
                  <Button className="w-full p-2 rounded-lg" onClick={handleNavigateToCourseProgressPage}>
                    Continue Course
                  </Button>
                ) : (
                  <BuyCourseButton  courseId={courseId} />
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
