import * as yup from "yup";

export const UserSchema = yup.object({
  username: yup
    .string()
    .min(2, "Username must be at least 4 characters")
    .required("username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});
