import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/course', credentials: 'include' }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (courseData) => ({
        url: '/create',
        method: 'POST',
        body: courseData,
      }),
    }),
  }),
});

export const { useCreateCourseMutation } = courseApi;
export default courseApi;