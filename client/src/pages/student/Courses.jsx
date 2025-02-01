import React from 'react'
import SingleCourseComponent from './SingleCourseComponent'
import CourseSkeleton from './CourseSkeleton'
import { useGetPublishedCourseQuery } from '@/features/api/courseApi'


const Courses = () => { 
  const {data, isLoading, isSuccess, isError, error} = useGetPublishedCourseQuery()
console.log(data)
  return (
    <div className="flex flex-col items-center justify-center mt-8">
        <div className=' text-center '> 
            <h1 className='font-bold text-3xl'>Our Courses</h1>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8  max-w-6xl mx-auto px-4 my-2'>
            {
                isLoading?  data?.course.map((course, i) => <CourseSkeleton key={i} />) :
                data?.course.map((course, i) => <SingleCourseComponent key={i}   course={course}/>) 
            } 

    </div>
    </div>
  )
}

export default Courses

