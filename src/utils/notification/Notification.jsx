import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Notification = ({ children }) => {
    return (
        <>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="dark"
                transition:Slide
            />
        </>
    )
}
export const notifySuccess = (message) => {
    toast.success(message);
};

export const notifyWarning = (message) => {
    toast.warning(message);
};

export const notifyError = (message) => {
    toast.error(message);
};

export default Notification