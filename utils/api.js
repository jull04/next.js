import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api_key = "live_8VHZC6qqrZx16wU609ocvPSn0JZTcz3s0MQn1JK6fbeaQw7oy30jNYH6iRlFkmWD";

export const catApi = createApi({
  reducerPath: 'catApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.thecatapi.com/v1/' }),
  endpoints: (builder) => ({
    fetchCatImages: builder.query({
      query: () => ({
        url: 'images/search?limit=100',
        headers: {
          'x-api-key': api_key,
        },
      }),
    }),
  }),
});

export const { useFetchCatImagesQuery } = catApi;