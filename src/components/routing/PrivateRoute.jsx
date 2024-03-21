import React, { useEffect, useState } from "react";
import AuthLayout from "./AuthLayout";
import Loader from "../../utils/loader/Loader";
import Login from "../login/Login";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { GetUser, getAccess, logoutUser } from "../login/Auth";
import Notify from "../../utils/snackbar/Notify";
const PrivateRoute = ({  component: Component ,...rest}) => {
  const { loggedIn, checkStatus,user } = AuthLayout();
  const dispatch = useDispatch()
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const value = localStorage.getItem("isStaff");
  
        if (value) {
          try {
            const staffData = await getAccess(user);
            
            if(!staffData){
              setMessage("Not a registered staff with any store")
              setType("warning")
              await logoutUser()
              localStorage.removeItem("isStaff")
              
            }
            const ob = {
              email: staffData.sellerEmail,
              phoneNumber: "+91"+staffData.sellerMobile,
              isStaff: true,
              roles: staffData.roles,
              isFace: staffData.isFace,
              staffName: staffData.staffName,
              staffMobile: staffData.mobile
            };
            dispatch(login(ob));
          } catch (error) {
            console.error("Error fetching staff data:", error);
          }
        } else {
          const ob = {
            email: user.email,
            phoneNumber: user.phoneNumber,
            isStaff: false,
            roles: [],
            isFace: false,
            staffName: null,
            staffMobile: null
          };
          dispatch(login(ob));
        }
      } else {
        dispatch(login(null));
      }
    };
  
    fetchData(); 
  
  }, [user, dispatch]);
  

  return (
    <>
     {message && type && <Notify message={message} type={type} />}
      {checkStatus?
     console.log("loading")
      :loggedIn?
      <Component {...rest} />:<Login />}
    </>
  );
};

export default PrivateRoute;
