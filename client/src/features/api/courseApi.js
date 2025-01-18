import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/course', credentials: 'include' }),
  tagTypes:["Refech-Courses"],
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (courseData) => ({
        url: '/create',
        method: 'POST',
        body: courseData,
        }),
        invalidatesTags:["Refech-Courses"]
    }),
    getCreaterCourses: builder.query({
      query:()=>({
        url:'/get',
        method:"GET"

      }),
      providesTags:["Refech-Courses"]
    })
  }),
});

export const { useCreateCourseMutation , useGetCreaterCoursesQuery } = courseApi;
export default courseApi;