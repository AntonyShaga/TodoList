export type userType = {
  id: number;
  email: string;
  login: string;
};
export type LoginDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
