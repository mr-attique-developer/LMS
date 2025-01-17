import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import SingleCourseComponent from './SingleCourseComponent'
import CourseSkeleton from './CourseSkeleton'


const Courses = () => {
   const  isLoading = falses
  return (
    <div className="flex flex-col items-center justify-center mt-8">
        <div className=' text-center '> 
            <h1 className='font-bold text-3xl'>Our Courses</h1>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8  max-w-6xl mx-auto px-4'>
            {
                isLoading?  Array(8).fill().map((_, i) => <CourseSkeleton key={i} />) :
                Array(8).fill().map((_, i) => <SingleCourseComponent key={i} />) 
            } 

    </div>
    </div>
  )
}

export default Courses

