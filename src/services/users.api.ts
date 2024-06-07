/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResponseUserDto } from "./dto/response-users.dto";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: () => {},
  }),
  keepUnusedDataFor: 60,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    newUser: builder.mutation<ResponseUserDto, Partial<ResponseUserDto>>({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
      transformErrorResponse(response) {
        console.log(response);
      },
    }),
    getUsers: builder.query<ResponseUserDto[], Partial<ResponseUserDto>>({
      query: () => "/users",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Users" as const, id })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],

      transformErrorResponse(error) {
        return error.data;
      },
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      transformErrorResponse(error) {
        console.log(error);
      },
    }),
    deleteUser: builder.mutation<{ success: boolean }, number>({
      query(id) {
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (_result, _error, id) => [{ type: "Users", id }],
      transformErrorResponse(error) {
        console.log(error);
      },
    }),
    updateUser: builder.mutation<
      ResponseUserDto,
      Pick<ResponseUserDto, "id"> & Partial<ResponseUserDto>
    >({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Users", id }],
      transformErrorResponse(error) {
        return error;
      },
    }),
  }),
});

export const {
  useNewUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApi;
