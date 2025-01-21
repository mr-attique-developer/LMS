import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateLectureMutation, useGetLectureQuery } from '@/features/api/lectureApi'
import { Edit, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const AddLecturePage = () => {
    const params = useParams()
    const courseId = params.courseId
    const navigate = useNavigate()
    // console.log(courseId)
    const [title, setTitle] = useState('')
// console.log(lectureTitle)
const {data:getLectureData, isError:getLectureError , isLoading:getLectureLoading, refetch} = useGetLectureQuery(courseId)
console.log(getLectureData)
    const [createLecture, { data, isSuccess, isLoading, error, isError}] = useCreateLectureMutation()

    const handleCreateLecture = async() => {
      await createLecture({title, courseId})
        console.log(title)
    }

    useEffect(()=>{

      if(isSuccess){
        refetch()
        toast.success(data.message || "Lecture created successfully")
        setTitle('')
      }
      if(isError){
        toast.error(error?.data.message || "Something went wrong  lecture not created")
      }
    },[data, isSuccess, error, isError, isLoading])


  return (
    <>
     <div className="md:p-16 p-2 w-full ">
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
           value={title}
           onChange={(e) => setTitle(e.target.value)}
           
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

        
    <div className='w-full  md:mt-8 mt-4'>
      {
        getLectureLoading && <div>Loading...</div>
      }
      {
        getLectureError && <div>Something went wrong</div>
      }
      {
        getLectureData && getLectureData.lectures.length === 0 && <div>No Lecture found</div>
      }
      {
        getLectureData && getLectureData.lectures.map((lecture, index) => (
          <div key={lecture._id} className='flex justify-between items-center p-4 border border-gray-200 mt-2'>
            <p>Lecture {index+1} <span className='font-bold'> {lecture.title}</span></p>
            <Edit onClick={()=> navigate(lecture._id)} className='cursor-pointer'/>
          </div>
        ))
      }
    </div>
      </div>
    

    </>
  )
}

export default AddLecturePage