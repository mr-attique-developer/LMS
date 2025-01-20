import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGetLectureQuery } from '@/features/api/lectureApi'
import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const UpdateLecturePage = () => {
    const {courseId, lectureId} = useParams()
    const [title, setTitle]= useState("")
    const [videoUrl, setVideoUrl]= useState(null)
    const {data, isLoading} = useGetLectureQuery(courseId)

    useEffect(()=>{
        data?.lectures?.map((lecture, index) => (
            setTitle(lecture.title)
            ))
    },[data, isLoading])
   

  return (
    <>
    <div className='md:p-16 p-2 w-full'>
        <div className='flex items-center gap-4 mb-4' >
            <div className='rounded-full p-2 border w-fit flex '>

            <Link to={`/admin/courses/${courseId}/lecture`} >
            <ArrowLeft className="w-6 h-6 cursor-pointer"/> 

            </Link>
            </div>
            <h1 className='font-bold text-2xl'>Update Your Lecture</h1>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Edit Lecture</CardTitle>
                <CardDescription className="capitalize">Make Changes and Click Save when You'r Done Lecture</CardDescription>
            </CardHeader>
            <CardContent>

                <Button variant="destructive"> Remove Lecture</Button> 
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
                          <Label className="text-md font-semibold">Video <span className='text-red-600'>*</span> </Label>
                          <Input
                           className="p-2  w-fit"
                           type="file"
                           accept="video/*"
                           name="videourl"
                           value={videoUrl}
                           onChange={(e) => setVideoUrl(e.target.value)}
                           
                           />
                        </div>
            </CardContent>
        </Card>
    </div>
    </>
  )
}

export default UpdateLecturePage