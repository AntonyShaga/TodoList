import { FormikHelpers, useFormik } from "formik";
import { authThunk } from "features/auth/model/auth-reducer";
import { BaseResponseType } from "common/types";
import { useActions } from "common/hooks/useActions";
import { LoginDataType } from "features/auth/api/authApi.types";

export const useLogin = () => {
  const { login } = useActions(authThunk);
  type FormikErrorType = Partial<LoginDataType>;
  type FormikValues = Omit<LoginDataType, "captcha">;
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        return { email: "Required" };
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        return { password: "Required" };
      } else if (values.password.length < 4) {
        errors.password = "Must be more five symbols";
      }
      return errors;
    },
    onSubmit: async (values, FormikHelpers: FormikHelpers<FormikValues>) => {
      FormikHelpers.setSubmitting(true);
      await login(values)
        .unwrap()
        .then((res) => {})
        .catch((e: BaseResponseType) => {
          e.fieldsErrors?.forEach((fieldsError) => {
            FormikHelpers.setFieldError(fieldsError.field, fieldsError.error);
          });
        });
      FormikHelpers.setSubmitting(false);
      //formik.resetForm();
    },
  });
  return { formik };
};
