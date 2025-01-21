import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const lectureApi = createApi({
    reducerPath: "lectureApi",
    tagTypes:["Lecture_Tags"],
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
            providesTags:["Lecture_Tags"]
        }),
        updateLecture: builder.mutation({
            query: ({courseId,lectureId, videoInfo, isPreviewFree, title}) => ({
                url: `/update/${courseId}/lecture/${lectureId}`,
                method: "POST",
                body: { videoInfo, isPreviewFree, title}
            }),
        }),
        deleteLecture: builder.mutation({
            query: (lectureId) =>({
                url: `/delete/${lectureId}`,
                method: "DELETE",
                
            }),
            invalidatesTags:["Lecture_Tags"]
        }),
        getLectureById: builder.query({
            query: (lectureId) =>({
                url: `/getById/${lectureId}`,
                method: "GET",
                
            })
        }),
    }),
})


export const {useCreateLectureMutation, useGetLectureQuery, useUpdateLectureMutation, useDeleteLectureMutation,useGetLectureByIdQuery} = lectureApi
export default lectureApi.reducer
