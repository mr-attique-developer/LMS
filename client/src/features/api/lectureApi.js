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
                url: `/${courseId}/create`,
                method: "POST",
                body: {title},
            }),
        }),
    }),
})


export const {useCreateLectureMutation} = lectureApi
export default lectureApi.reducer
