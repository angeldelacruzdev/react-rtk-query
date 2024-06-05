import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResponseUserDto } from "./dto/response-users.dto";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "localhost:3000" }),
  endpoints: (builder) => ({
    newUser: builder.mutation<ResponseUserDto, void>({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      transformErrorResponse(response){
        console.log(response)
      }
    }),
  }),
});

export const { useNewUserMutation } = usersApi;
