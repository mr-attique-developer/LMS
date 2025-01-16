import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { isLoggedIn } from '../authSlice';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/auth/' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (signupData) => ({
        url: 'register',
        method: 'POST',
        body: signupData,
      }),
    }),
    loginUser: builder.mutation({
      query: (signupData) => ({
        url: 'login',
        method: 'POST',
        body: signupData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
            const result = await queryFulfilled;
            dispatch(isLoggedIn({user: result.data.user}))
        } catch (error) {
          console.error('Failed to fetch login query:', error)
            
        }
      }
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {  useLoginUserMutation,useRegisterUserMutation} = authApi
export default authApi.reducer