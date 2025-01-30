import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const courseProgressApi = createApi({
    reducerPath:"courseProgressApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:5000/api/v1/courseProgress",
        credentials:"include"
    }),
    endpoints: (builder) =>({
        getCourseProgress: builder.query({
            query:(courseId) =>({
                url:`/getProgress/${courseId}`,
                method:"GET"
            })
        }),
        updateCourseProgress: builder.mutation({
            query:({courseId, lectureId} ) =>({
                url: `/updateProgress/${courseId}/lecture/${lectureId}/view`,
                method:"POST"
            })
        }),
        markAsCompleted: builder.mutation({
            query:({courseId} ) =>({
                url: `/markAsCompleted/${courseId}`,
                method:"POST",

            })
        }),
        markAsInCompleted: builder.mutation({
            query:({courseId} ) =>({
                url: `/markAsInCompleted/${courseId}`,
                method:"POST",

            })
        }),
       

    }) 
})


export const {useGetCourseProgressQuery, useUpdateCourseProgressMutation, useMarkAsCompletedMutation, useMarkAsInCompletedMutation} = courseProgressApi