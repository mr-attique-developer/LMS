import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useDeleteLectureMutation, useGetLectureByIdQuery, useGetLectureQuery, useUpdateLectureMutation } from "@/features/api/lectureApi";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const UpdateLecturePage = () => {
  const navigate = useNavigate()
  const { courseId, lectureId } = useParams();
  const [title, setTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [disableButton, setDisableButton] = useState(true);

  // const { data, isLoading } = useGetLectureQuery(courseId);
  const  [updateLecture, {data:updateLectureData, isLoading: updateLectureIsLoading, isError , isSuccess, error} ] = useUpdateLectureMutation()
  const [deleteLecture, {data:removeData, isLoading: removeIsLoading, isSuccess:removeIsSuccess, isError:removeIsError, error:removeError}] = useDeleteLectureMutation()
  const {data} = useGetLectureByIdQuery(lectureId)

const getLectureByIdData = data?.lecture
useEffect(()=>{
if(getLectureByIdData){
  setTitle(getLectureByIdData?.title)
  setIsPreviewFree(getLectureByIdData?.isPreviewFree)
  setUploadVideoInfo(getLectureByIdData?.videoUrl)
}
},[getLectureByIdData])


  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setMediaProgress(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/media/upload-video",
        formData,
        {

            onUploadProgress: ({ loaded, total }) => {
                setUploadProgress(Math.round((loaded * 100) / total));
            },
        }
      );
      console.log(res);

      if (res.data.success) {
        console.log(res);
        setUploadVideoInfo({
          videoUrl: res.data.data.url,
          publicId: res.data.data.public_id,
        });
        setDisableButton(false);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in uploading video");
    } finally{
        setMediaProgress(false)
    }
  };

  const handleUpdateLecture = async()=>{
    await updateLecture({courseId, videoInfo:uploadVideoInfo, isPreviewFree, title, lectureId})
  }

  const handleDeleteLecture = async()=>{
    await deleteLecture(lectureId)
  }

  useEffect(()=>{
if(isSuccess){
  toast.success(updateLectureData.message)
  navigate(`/admin/courses/${courseId}/lecture`)
}
if(isError){
  toast.success(error?.data?.message)
}
  },[updateLectureIsLoading, isError, isSuccess])

  useEffect(()=>{
if(removeIsSuccess){
  navigate(`/admin/courses/${courseId}/lecture`)
  toast.success(removeData?.message)
}
if(removeIsError){
  toast.error(removeError?.data?.message)
}
  },[removeIsLoading,removeIsError, removeIsError])

console.log(isPreviewFree)
  return (
    <>
      <div className="md:p-16 p-2 w-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="rounded-full p-2 border w-fit flex ">
            <Link to={`/admin/courses/${courseId}/lecture`}>
              <ArrowLeft className="w-6 h-6 cursor-pointer" />
            </Link>
          </div>
          <h1 className="font-bold text-2xl">Update Your Lecture</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Lecture</CardTitle>
            <CardDescription className="capitalize">
              Make Changes and Click Save when You'r Done Lecture
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled={removeIsLoading} variant="destructive" onClick={handleDeleteLecture}>{
              removeIsLoading? <>
              <Loader2 className="animate-spin" /> Wait Please
              </>: 
              "Remove Lecture"

              }</Button>
            <div className="mt-8">
              <Label className="text-md font-semibold">Lecure Title</Label>
              <Input
                placeholder="Enter Lecture title"
                className="p-2 "
                name="lectureTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mt-8">
              <Label className="text-md font-semibold">
                Video <span className="text-red-600">*</span>{" "}
              </Label>
              <Input
                className="p-2  w-fit"
                type="file"
                accept="video/*"
                name="videourl"
                onChange={handleVideoUpload}
              />
            </div>

            <div className="flex items-center space-x-2 my-4">
              <Switch id="airplane-mode" checked={isPreviewFree} onCheckedChange={setIsPreviewFree}/>
              <Label htmlFor="airplane-mode" className="capitalize">
                Is this free video
              </Label>
            </div>

            {mediaProgress && (
              <div className="my-4">
                <Progress value={uploadProgress} />
                <p>{uploadProgress}% uploaded</p>
              </div>
            )}
            <Button disabled={updateLectureIsLoading} onClick={handleUpdateLecture}>
              {
                updateLectureIsLoading? <>
                <Loader2 className="animate-spin"/> Wait Please
                </>:"Update Lecture"
              }
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UpdateLecturePage;
