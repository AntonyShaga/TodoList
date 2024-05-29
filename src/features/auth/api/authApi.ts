import { instance } from "common/api/instance";
import { ResponseType } from "common/types/commonTypes";
import { LoginDataType, userType } from "features/auth/api/authApi.types";

export const authAPI = {
  me() {
    return instance.get<ResponseType<userType>>(`auth/me`);
  },
  login(data: LoginDataType) {
    return instance.post<ResponseType<{ userId: number }>>(`/auth/login`, data);
  },
  logout() {
    return instance.delete<ResponseType<{ userId: number }>>(`/auth/login`);
  },
};
