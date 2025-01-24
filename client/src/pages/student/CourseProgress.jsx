import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CheckCircle2, PlayCircle } from "lucide-react";
import React from "react";

const lectures = [
  { id: 1, title: "Introduction to Next.js" },
  { id: 2, title: "Setting up the Environment" },
  { id: 3, title: "Creating Your First Page" },
  { id: 4, title: "Routing in Next.js" },
  { id: 5, title: "Deploying Your Application" },
];

const CourseProgress = () => {
  const isCompleted = true;
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <h1 className="text-3xl font-bold">Course Title</h1>
        <Button>Mark as Completed</Button>
      </div>
      <div className="max-w-7xl flex flex-col md:flex-row justify-between mx-auto mt-6">
        <div className="w-full md:w-3/5">
          <div className="flex-1 h-fit">
            <video src="" className="w-full h-auto"></video>
            <div className="mt-4">
              <h1 className="text-xl font-semibold">Lecture Title</h1>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/5 mt-6 md:mt-0 md:border-l-2 md:border-slate-900">
            <h1 className="font-bold text-xl m-3">Course Lectures</h1>
          <div className="space-y-3 m-3 flex-1 overflow-y-auto">
            {lectures.map((lecture, i) => (
              <Card key={i} className="flex items-center  justify-between ">
                <CardContent className="flex items-center justify-between p-4 w-full">
                    <div className="flex items-center gap-3">

                  <span>{isCompleted ? <CheckCircle2 className="text-green-500" /> : <PlayCircle className="text-blue-500" />}</span>
                  <CardTitle className="font-medium">{lecture.title}</CardTitle>
                    </div>
                  <div >

                  <Badge variant={"outline"} className="flex self-end p-1 bg-green-300 text-green-700">Completed</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;