import { instance } from "common/api/instance";
import { BaseResponseType } from "common/types/commonTypes";
import { LoginDataType, userType } from "features/auth/api/authApi.types";

export const authAPI = {
  me() {
    return instance.get<BaseResponseType<userType>>(`auth/me`);
  },
  login(data: LoginDataType) {
    return instance.post<BaseResponseType<{ userId: number }>>(`/auth/login`, data);
  },
  logout() {
    return instance.delete<BaseResponseType<{ userId: number }>>(`/auth/login`);
  },
};
