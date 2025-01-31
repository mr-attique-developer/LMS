import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useGetCourseProgressQuery,
  useMarkAsCompletedMutation,
  useMarkAsInCompletedMutation,
  useUpdateCourseProgressMutation,
} from "@/features/api/courseProgress";
import { CheckCircle, CheckCircle2, PlayCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const courseId = useParams().courseId;

  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);
  const [updateCourseProgress] = useUpdateCourseProgressMutation();
  const [
    markAsCompleted,
    { data: markAsCompletedData, isSuccess: markAsCompletedIsSuccess },
  ] = useMarkAsCompletedMutation();
  const [
    markAsInCompleted,
    { data: markAsInCompletedData, isSuccess: markAsInCompletedIsSuccess },
  ] = useMarkAsInCompletedMutation();

  useEffect(() => {

    if (markAsCompletedIsSuccess) {
      refetch();
      toast.success(markAsCompletedData?.message);
    }
    if (markAsInCompletedIsSuccess) {
      refetch();
      toast.success(markAsInCompletedData?.message);
    }
  }, [markAsCompletedIsSuccess, markAsInCompletedIsSuccess]);

  const [currentLecture, setCurrentLecture] = useState(null);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error in Loading course Details</div>;
  console.log(data);

  const { course, progress, completed } = data?.data;
  const handleCourseProgress = async (lectureId) => {
    await updateCourseProgress({ courseId, lectureId });
    refetch();
  };
  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  console.log(progress);
  const handleMarkAsCompleted = async () => {
    try {
      await markAsCompleted(courseId);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };
  const handleMarkAsInCompleted = async () => {
    try {
      await markAsInCompleted(courseId);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };
  const initialLecture =
    currentLecture || (course?.lectures && course?.lectures[0]);
  console.log(initialLecture);

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleCourseProgress(lecture._id);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <h1 className="text-3xl font-bold">{course?.title}</h1>
        <Button
          onClick={completed ? handleMarkAsInCompleted : handleMarkAsCompleted}
          variant={completed ? "outline" : "default"}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>{" "}
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>
      <div className="max-w-7xl flex flex-col md:flex-row justify-between mx-auto mt-6">
        <div className="w-full md:w-3/5">
          <div className="flex-1 h-fit mx-2">
            <video
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              controls
              className="w-full h-auto md:rounded-lg"
            />
            <div className="mt-4">
              <h1 className="text-xl font-semibold">{`Lecture  ${
                course?.lectures.findIndex(
                  (lecture) =>
                    lecture._id === (currentLecture?._id || initialLecture._id)
                ) + 1
              } :  ${currentLecture?.title || initialLecture?.title}`}</h1>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/5 mt-6 md:mt-0 md:border-l-2 md:border-slate-900">
          <h1 className="font-bold text-xl m-3">Course Lectures</h1>
          <div className="space-y-3 m-3 flex-1 overflow-y-auto">
            {course?.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={` flex items-center  justify-between cursor-pointer ${
                  lecture._id === currentLecture?._id
                    ? "bg-gray-300 dark:dark:bg-gray-800"
                    : ""
                }  `}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4 w-full">
                  <div className="flex items-center gap-3">
                    <span>
                      {isLectureCompleted(lecture._id) ? (
                        <CheckCircle2 className="text-green-500" />
                      ) : (
                        <PlayCircle className="text-blue-500" />
                      )}
                    </span>
                    <CardTitle className="font-medium">
                      {lecture.title}
                    </CardTitle>
                  </div>
                  <div>
                    {isLectureCompleted(lecture._id) && (
                      <Badge
                        variant={"outline"}
                        className="flex self-end p-1 bg-green-300 text-green-700"
                      >
                        Completed
                      </Badge>
                    )}
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
