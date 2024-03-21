import React from "react";
import { ToastContainer } from 'react-toastify';
const SuccessAlert = ({ message }) => {
  return (
    <ToastContainer
    position="top-center"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    
    />
  );
};

export default SuccessAlert;
