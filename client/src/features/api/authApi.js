import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { isLoggedIn } from '../authSlice';

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1/auth/',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (signupData) => ({
        url: 'register',
        method: 'POST',
        body: signupData,
      }),
    }),
    loginUser: builder.mutation({
      query: (loginData) => ({
        url: 'login',
        method: 'POST',
        body: loginData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(isLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.error('Login error:', error);
        }
      },
    }),
    getUserProfile : builder.query({
      query:()=>({
        url: "profile",
        method: "GET"
      })

    }),
    logoutUser : builder.mutation({
      query:()=>({
        url: "logout",
        method: "GET"
      })

    }),
    updateUserProfile:builder.mutation({
      query:(formData)=>({
        url:"profile/update",
        method:"PUT",
        body:formData
      })
    })
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginUserMutation, useRegisterUserMutation,useGetUserProfileQuery,useUpdateUserProfileMutation, useLogoutUserMutation } = authApi;
export default authApi.reducer;