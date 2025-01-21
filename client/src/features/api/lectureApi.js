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
        updateLecture: builder.mutation({
            query: ({courseId,lectureId, videoInfo, isPreviewFree, title}) => ({
                url: `/update/${courseId}/lecture/${lectureId}`,
                method: "POST",
                body: { videoInfo, isPreviewFree, title}
            }),
        }),
    }),
})


export const {useCreateLectureMutation, useGetLectureQuery, useUpdateLectureMutation} = lectureApi
export default lectureApi.reducer
