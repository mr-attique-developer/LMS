import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const SingleCourseComponent = () => {
  return (
    <div>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            src={"https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg"}
            alt="course"
            className="w-full h-36 object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <div className="space-y-3">
            <h1 className="text-xl hover:underline cursor-pointer mt-5 font-bold text-gray-800 dark:text-gray-100 truncate">
              The Complete Next.js Course 2024: From Zero to Expert!
            </h1>
            <div className="flex items-center  justify-between mt-3">
              <div className="flex items-center gap-6">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="font-medium text-sm">Attique</h1>
              </div>
              <Badge className="py-1 px-2  rounded-full text-sm">Advance</Badge>
            </div>

            <div className="text-lg font-bold">
              <span>$ 45</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleCourseComponent;
