import axios, { AxiosResponse } from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "044ec9dc-0b7b-4a82-9dda-ff56e7fcaefd",
  },
});
