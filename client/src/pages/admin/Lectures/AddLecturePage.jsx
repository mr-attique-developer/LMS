import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const AddLecturePage = () => {
    const params = useParams()
    const courseId = params.courseId
    const [lectureTitle, setLectureTitle] = useState('')
    const isLoading = false

    const handleCreateLecture = () => {
        console.log(lectureTitle)
    }
  return (
    <>
     <div className="md:p-16 p-2 w-full overflow-hidden">
        <h1 className="text-2xl font-bold">
          Lets add course, add some basic details for your new course
        </h1>
        <p className="mt-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus
          autem recusandae optio?
        </p>

        <div className="mt-8">
          <Label className="text-md font-semibold">Lecure Title</Label>
          <Input
           placeholder="Enter Lecture title" 
           className="p-2 mt-3"
           name="lectureTitle"
           value={lectureTitle}
           onChange={(e) => setLectureTitle(e.target.value)}
           
           />
        </div>
       

        <div className="flex gap-3 mt-5">
          <Button variant="outline"> <Link to={`/admin/courses/${courseId}`}>Back to Courses</Link></Button>
          <Button disabled={isLoading}  onClick={handleCreateLecture}>
            {
              isLoading ?
              <>
              <Loader2 className="animate-spin"/> Wait Please
              </> : "Create Lecture"
            }
          </Button>
        </div>
      </div>
    
    </>
  )
}

export default AddLecturePage