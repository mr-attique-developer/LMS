import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const coursePurchaseApi = createApi({
    reducerPath: "coursePurchaseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1/purchase",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        createCheckoutSession: builder.mutation({
            query: (courseId) => ({
                url: "/checkout/create-checkout-session",
                method: "POST",
                body:{courseId}
            }),
        }),
        stripeWebhook: builder.mutation({
            query: () => ({
                url: "/course-purchase/webhook",
                method: "POST",
            }),
        }),
    }),
})


export const {useCreateCheckoutSessionMutation, useStripeWebhookMutation} = coursePurchaseApi