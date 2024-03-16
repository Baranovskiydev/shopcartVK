
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cart } from "../interfaces/Cart";

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com'}),
    endpoints: (builder) => ({
        getCartById: builder.query<Cart,number>({
            query: (id) => `/carts/${id}`
        }),
    }),
})

export const { useGetCartByIdQuery } = cartApi