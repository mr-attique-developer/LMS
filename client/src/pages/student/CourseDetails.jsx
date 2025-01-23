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
import { BadgeInfo, Info, Lock, PlayCircle } from "lucide-react";
import React from "react";

const CourseDetails = () => {
  const purchase = true;
  return (
    <div className="w-full overflow-x-hidden">
      <div className="min-h-60 bg-blue-700">
        <div className="container mx-auto p-8 text-left">
          <h1 className="capitalize text-xl md:text-5xl font-bold my-3">
            Master Next.js Full Course
          </h1>
          <p className="capitalize text-sm md:text-base">
            Build scalable, modern web apps with React & Next.js
          </p>
          <p className="capitalize text-sm md:text-base ">
            Created by{" "}
            <span className="underline text-slate-700 my-3 cursor-pointer">
              Mr Ateeq
            </span>
          </p>

          <div className="flex items-center gap-1 text-sm md:text-base ">
            <BadgeInfo className="" />
            <p>Last update 2024-5-09</p>
          </div>
          <p className="text-xs md:text-base">Student Enrolled: 1</p>
        </div>
      </div>

      <div className="container mx-auto mt-4 px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
          <div className="w-full md:w-3/5">
            <h1 className="text-3xl font-bold my-3">Description</h1>
            <p className="text-wrap">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              sint beatae corporis necessitatibus eum quos tempora temporibus.
              Quos voluptatem quisquam repudiandae quasi nobis.
            </p>
            <div className="my-5">
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                  <CardDescription>4 Lectures</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Array(3)
                    .fill()
                    .map((c, i) => (
                      <div className="flex items-center gap-3" key={i}>
                        <span>{true ? <PlayCircle /> : <Lock />}</span>
                        <p>Lecture Title</p>
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
                  React player video
                </div>
                <h1>Lecture Title</h1>

                <Separator className="my-4" />
              </CardContent>
              <CardFooter>
                {purchase ? (
                  <Button className="w-full p-2 rounded-lg">
                    Continue Course
                  </Button>
                ) : (
                  <BuyCourseButton />
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
