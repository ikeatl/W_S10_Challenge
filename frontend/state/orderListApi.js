import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderListApi = createApi({
  reducerPath: "orderListApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9009/api" }), // endpoint to get past orders
  tagTypes: ["OrderList"], // what will my tagTypes be?
  endpoints: (builder) => ({
    getOrderList: builder.query({
      query: () => "pizza/history",
      providesTags: ["OrderList"],
    }),
    createPizzaOrder: builder.mutation({
      query: (order) => ({
        url: "pizza/order",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["OrderList"],
    }),
    FilterOrderListByPizzaSize: builder.query({
      query: (size) => `pizza/order?size=${size}`,
      providesTags: ["OrderList"],
    }),
    updatePizzaOrder: builder.mutation({
      query: ({ orderId, updatedOrder }) => ({
        url: `pizza/order/${orderId}`,
        method: "PUT",
        body: updatedOrder,
      }),
      invalidatesTags: ["OrderList"],
    }),
    deletePizzaOrder: builder.mutation({
      query: (orderId) => ({
        url: `pizza/order/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OrderList"],
    }),
  }),
});

export const { useGetOrderListQuery, useCreatePizzaOrderMutation, useFilterOrderListByPizzaSizeQuery, useUpdatePizzaOrderMutation, useDeletePizzaOrderMutation } = orderListApi;
