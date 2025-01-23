import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { useNavigate } from "react-router-dom";

const SingleCourseComponent = ({course}) => {
  const navigate= useNavigate()
  return (
    <div>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer" onClick={()=>navigate(`/course-detail/${course?._id}`)} >
        <div className="relative">
          <img
            src={course?.courseThumbnail}
            alt="course"
            className="w-full h-36 object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <div className="space-y-3">
            <h1 className="text-xl hover:underline cursor-pointer mt-5 font-bold text-gray-800 dark:text-gray-100 truncate">
              {course?.title}
            </h1>
            <div className="flex items-center  justify-between mt-3">
              <div className="flex items-center gap-6 mr-3">
                <Avatar>
                  <AvatarImage src= {course?.creater?.photoUrl ||"https://github.com/shadcn.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="font-medium text-sm">{course?.creater?.username}</h1>
              </div>
              <Badge className="py-1 px-2  rounded-full text-sm">{course?.level}</Badge>
            </div>

            <div className="text-lg font-bold">
              <span>$ {course?.price}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleCourseComponent;
