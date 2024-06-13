import { instance } from "common/api/instance";
import { BaseResponse } from "common/types/commonTypes";
import { LoginDataType, userType } from "features/auth/api/authApi.types";

export const authAPI = {
  me() {
    return instance.get<BaseResponse<userType>>(`auth/me`);
  },
  login(data: LoginDataType) {
    return instance.post<BaseResponse<{ userId: number }>>(`/auth/login`, data);
  },
  logout() {
    return instance.delete<BaseResponse<{ userId: number }>>(`/auth/login`);
  },
  captcha() {
    return instance.get("security/get-captcha-url");
  },
};
