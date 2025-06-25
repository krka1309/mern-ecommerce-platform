import { apiSlice } from "./apiSlice";
import { ORDER_URL, PAYPAL_URL } from "../constants";
export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        method: "POST",
        url: `${ORDER_URL}`,
        body: order,
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        method: "GET",
      }),
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDER_URL}/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),
    getPayPalClientID: builder.query({
      query: () => ({
        url: `${PAYPAL_URL}`,
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/mine`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),

    getOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}`,
        method: "GET",
      }),
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => ({
        method: "PUT",
        url: `${ORDER_URL}/${orderId}/deliver`,
      }),
    }),
    getTotalOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/totalOrders`,
        method: "GET",
      }),
    }),
    getTotalSales: builder.query({
      query: () => ({
        url: `${ORDER_URL}/totalSales`,
        method: "GET",
      }),
    }),
    getTotalSaleByDate: builder.query({
      query: () => ({
        url: `${ORDER_URL}/totalSaleByDate`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIDQuery,
  useGetMyOrdersQuery,
  useDeliverOrderMutation,
  useGetTotalOrdersQuery,
  useGetTotalSaleByDateQuery,
  useGetTotalSalesQuery,
  useGetOrdersQuery,
} = orderApiSlice;
