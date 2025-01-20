import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const lectureApi = createApi({
    reducerPath: "lectureApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1/lecture",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        createLecture: builder.mutation({
            query: ({title, courseId}) => ({
                url: `/create/${courseId}`,
                method: "POST",
                body: {title},
            }),
        }),
        getLecture: builder.query({
            query: (courseId) => ({
                url: `/get/${courseId}`,
                method: "GET"
            }),
        }),
    }),
})


export const {useCreateLectureMutation, useGetLectureQuery} = lectureApi
export default lectureApi.reducer
