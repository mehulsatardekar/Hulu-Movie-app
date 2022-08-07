import React, { createContext, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

const Toast = createContext(null);

const ToastContextData = ({ children }) => {
  const notifySuccess = (successmsg) =>
    toast.success(successmsg, {
      icon: "👏",
      duration: 5000,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

  const notifyError = (errormsg) =>
    toast.error(errormsg, {
      icon: "😭",
      duration: 5000,
      style: {
        borderRadius: "10px",
        background: "#F03A17",
        color: "#FFFFFF",
      },
    });
  return (
    <Toast.Provider value={{ notifySuccess, notifyError }}>
      {children}
    </Toast.Provider>
  );
};

const useToast = () => useContext(Toast);

export { ToastContextData, useToast };
