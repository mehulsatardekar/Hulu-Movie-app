import React from "react";
import { Signup } from "../../../components";
import { Toaster } from "react-hot-toast";

const SignupPage = () => {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Signup />
    </>
  );
};

export { SignupPage };
