import React from 'react'
import CourseSkeleton from './CourseSkeleton'
import SingleCourseComponent from './SingleCourseComponent'
import { useGetUserProfileQuery } from '@/features/api/authApi'

const MyLearning = () => {
   const {data, isLoading} = useGetUserProfileQuery()
   console.log(data)
   const myLearning = data?.user?.enrolledCourses || []
  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
    <h1 className="font-bold text-2xl">MY LEARNING</h1>
    <div className="my-5">
      {isLoading ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {

                
                myLearning.map((course, index) => (
                    <CourseSkeleton key={index}  course={course} />
                ))
            }
        </div>
      ) : myLearning.length === 0 ? (
        <p>You are not enrolled in any course.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {myLearning.map((course, index) => (
            <SingleCourseComponent key={index} course={course} />
          ))}
        </div>
      )}
    </div>
  </div>
  )
}

export default MyLearning