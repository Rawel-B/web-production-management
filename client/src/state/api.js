import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api', credentials: "include" /*import.meta.env.VITE_APP_BASE_URL*/ }),
  reducerPath: "adminApi",
  tagTypes: [
    //=============> User
    "Auth",
    "User",
    "Workers",
    "Managers",
    //=============> Orders
    "Orders",
    //=============> Stocks
    "Stocks",
    //=============> Products
    "Products",
    //=============> Sales
    "Sales",
    //=============> Management
    "Support",
    "Geography",
    "Admins",
    "UserPerformance",
    "Dashboard",
  ],
  endpoints: (builder) => ({
    //=============> Auth
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
      transformResponse: (response) => ({
        user: response.user,
        accessToken: response.accessToken
      }),
      invalidatesTags: ["Auth", "User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ["Auth", "User"],
    }),
    verifyAuth: builder.query({
      query: () => ({
        url: '/auth/auth',
        method: 'GET',
      }),
      providesTags: ["Auth"],
    }),
    generateToken: builder.query({
      query: () => ({
        url: '/auth/generatetoken',
        method: 'POST',
      }),
      providesTags: ["Auth"],
    }),
    //=============> User
    getUserById: builder.query({
      query: (_id) => `/user/currentuser/${_id}`,
      providesTags: ["User"],
    }),
    getAllWorkers: builder.query({
      query: () => `/user/workers`,
      providesTags: ["User", "Workers"],
    }),
    getAllManagers: builder.query({
      query: () => `/user/managers`,
      providesTags: ["User", "Managers"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/deletebyid/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["User", "Workers", "Managers"]
    }),
    updateUser: builder.mutation({
      query: ({ email, editFormData }) => ({
        url: `/user/updatebyemail/${email}`,
        method: 'PUT',
        body: editFormData,
      }),
      invalidatesTags: ['User', "Workers", "Managers"]
    }),
    //=============> Orders
    getOrders: builder.query({
      query: () => `/orders`,
      providesTags: ["Orders"],
    }),
    postNewOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/orders/releaseorder",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ["Orders"],
    }),
    //=============> Products
    getProducts: builder.query({
      query: () => `/products`,
      providesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/deletebyid/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products']
    }),
    //=============> Stocks
    getStocks: builder.query({
      query: () => `/stocks`,
      providesTags: ["Stocks"],
    }),
    deleteStock: builder.mutation({
      query: (id) => ({
        url: `/stocks/deletebyid/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Stocks']
    }),
    //=============> Sales
    getSales: builder.query({
      query: () => `/sales`,
      providesTags: ["Sales"],
    }),
    getSalesStats: builder.query({
      query: () => `/sales/stats`,
      providesTags: ["Sales"],
    }),
    //=============> Management
    getSupportTickets: builder.query({
      query: () => ({
        url: "/user/tickets",
        method: "GET",
      }),
      providesTags: ["Support"],
    }),
    postNewSupportTicket: builder.mutation({
      query: (ticketData) => ({
        url: "/user/openticket",
        method: "POST",
        body: ticketData,
      }),
      invalidatesTags: ["Support"],
    }),
    updateSupportTicket: builder.mutation({
      query: ({_id, status}) => ({
        url: `/user/updateticket/${_id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Support"],
    }),
    getGeography: builder.query({
      query: () => `client/geography`,
      providesTags: ["Geography"],
    }),
    getAdmins: builder.query({
      query: () => `management/admins`,
      providesTags: ["Admins"],
    }),
    getUserPerformance: builder.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["UserPerformance"],
    }),
    getDashboard: builder.query({
      query: () => `general/dashboard`,
      providesTags: ["Dashboard"],
    }),
  }),
});

console.log("Base URL:", import.meta.env.VITE_APP_BASE_URL);

export const {
  useLoginMutation,
  useLogoutMutation,
  useVerifyAuthQuery,
  useGenerateTokenQuery,
  useGetUserByIdQuery,
  useGetAllWorkersQuery,
  useGetAllManagersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetOrdersQuery,
  usePostNewOrderMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
  useGetStocksQuery,
  useDeleteStockMutation,
  useGetSalesQuery,
  useGetSalesStatsQuery,
  useGetSupportTicketsQuery,
  usePostNewSupportTicketMutation,
  useUpdateSupportTicketMutation,
  useGetGeographyQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;
