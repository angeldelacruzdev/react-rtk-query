import { createApi } from "@reduxjs/toolkit/query/react";
import { ResponseUserDto } from "./dto/response-users.dto";
import { axiosBaseQuery } from "../axiosBaseQuery";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    newUser: builder.mutation<ResponseUserDto, Partial<ResponseUserDto>>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }),
    getUsers: builder.query<ResponseUserDto[], Partial<ResponseUserDto>>({
      query: () => ({ url: "/users" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Users" as const, id })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
    getUser: builder.query({
      query: (id) => ({ url: `/users/${id}` }),
    }),
    deleteUser: builder.mutation<{ success: boolean }, number>({
      query(id) {
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    updateUser: builder.mutation<
      ResponseUserDto,
      Pick<ResponseUserDto, "id"> & Partial<ResponseUserDto>
    >({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        data: body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Users", id }],
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
