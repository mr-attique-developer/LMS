import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/course",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (courseData) => ({
        url: "/create",
        method: "POST",
        body: courseData,
      }),
    }),
    getCreaterCourses: builder.query({
      query: () => ({
        url: "/get",
        method: "GET",
      }),
    }),
    updateCreaterCourse: builder.mutation({
      query: ({ courseData, courseId }) => ({
        url: `/update/${courseId}`,
        method: "PUT",
        body: courseData,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCreaterCoursesQuery,
  useUpdateCreaterCourseMutation,
} = courseApi;