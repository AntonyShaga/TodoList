import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormikHelpers, useFormik } from "formik";
import { Navigate } from "react-router-dom";
import { selectIsLogetIn } from "features/auth/model/auth.selectors";
import { authThunk } from "features/auth/model/auth-reducer";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useAppSellector } from "app/store";
import { BaseResponseType } from "common/types";
import { LoginDataType } from "features/auth/api/authApi.types";
import { useLogin } from "features/auth/lib/useLogin";

export const Login = () => {
  const isLoggetIn = useAppSellector(selectIsLogetIn);
  const formik = useLogin();
  if (isLoggetIn) {
    return <Navigate to={"/"} />;
  }
  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <FormControl>
          <FormLabel>
            <p>
              To log in get registered
              <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                error={!!(formik.touched.email && formik.errors.email)}
                /*name='email'
                                                onChange={formik.handleChange}
                                                value={formik.values.email}
                                                onBlur={formik.handleBlur}*/
                //helperText={formik.errors.email}
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && <div style={{ color: "red" }}>{formik.errors.email}</div>}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                error={!!(formik.touched.password && formik.errors.password)}
                /*name='password'
                                                onChange={formik.handleChange}
                                                value={formik.values.password}
                                                onBlur={formik.handleBlur}*/
                //helperText={formik.errors.password}
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              )}
              <FormControlLabel
                label={"Remember me"}
                control={
                  <Checkbox name="rememberMe" onChange={formik.handleChange} checked={formik.values.rememberMe} />
                }
              />
              <Button disabled={formik.isSubmitting} type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  );
};
