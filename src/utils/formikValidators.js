import * as Yup from "yup";

const emailRegex =
  /^[a-z0-9]+(?!.*(?:\+{2,}|\-{2,}|\.{2,}))(?:[\.+\-]{0,1}[a-z0-9])*@gmail\.com$/;

const wrongEmailMessage =
  "Invalid Email format it should contain valid email address eg: alexdadario@gmail.com";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const wrongPasswordMessage =
  "Password should be minimum 8 length and must have One Uppercase,One Lowercase,One Digit Number,One Special Character";

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email Format Email should contain valid email address")
    .required("Email Address is required")
    .matches(emailRegex, wrongEmailMessage),
  password: Yup.string()
    .required("Password is Required")
    .matches(passwordRegex, wrongPasswordMessage),
});

const signupValidationSchema = Yup.object({
  username: Yup.string().required("username is required"),

  email: Yup.string()
    .required("Invalid Email Format Email should contain valid email address")
    .required("Email Address is required")
    .matches(emailRegex, wrongEmailMessage),

  password: Yup.string()
    .required("Password is required")
    .matches(passwordRegex, wrongPasswordMessage),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Mismatched passwords")
    .required("Please confirm your password"),
});
export {
  emailRegex,
  wrongEmailMessage,
  passwordRegex,
  wrongPasswordMessage,
  loginValidationSchema,
  signupValidationSchema
};
