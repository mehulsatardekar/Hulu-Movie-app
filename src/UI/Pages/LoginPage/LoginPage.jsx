import React from "react";
import { Signin } from "../../../components";
import { Toaster } from "react-hot-toast";

const LoginPage = () => {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Signin />
    </>
  );
};

export { LoginPage };
