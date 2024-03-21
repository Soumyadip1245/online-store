import { RecaptchaVerifier, signInWithPhoneNumber,signInWithPopup } from "firebase/auth";
import { auth,authStore,provider } from "../../utils/firebase";
import Seller from "../../models/seller";
import Access from "../../models/access";
import { useDispatch, useSelector } from 'react-redux';

export const phoneLogin = async (phone) =>{
    
    const recaptchaContainer = document.getElementById("recaptcha-container");
    const recaptcha = new RecaptchaVerifier(auth, recaptchaContainer, {
      size: "invisible",
      callback: (response) => { },
    });
    try {
        const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha)
        return confirmation
      } catch (error) {
        return null
      }
}
export const googleLogin = async()=>{
  const user = await signInWithPopup(auth,provider)
  return user

}
export const googleLoginForstore = async()=>{
  const user = await signInWithPopup(authStore,provider)
  return user

}
export const logoutUser = async () =>{
  localStorage.removeItem("isStaff")
    return await auth.signOut()
  }
export const logoutUserForstore = async () =>{
    return await authStore.signOut()
  }
export const getAccess = async (user) =>{
 
    const number = user.phoneNumber.replace(/\D/g, "").slice(2, 12);
    const access = new Access()
    
    access.mobile = number
    const accessData = await access.getAccessByMobile()
    if(!accessData) return null
    else return accessData
  
}
export const GetUser = async (user) =>{
  
  if(user && user.email){
    const seller = new Seller();
    seller.profile.email.value = user.email;
    const sellerUser = await seller.getSellerByEmailId();
    if (!sellerUser) {
      return null
    } else {
      return sellerUser;
    }
  }
  else if(user){
    const number = user.phoneNumber.replace(/\D/g, "").slice(2, 12);
    const seller = new Seller();
    seller.mobile.number = number;
    const sellerUser = await seller.getSellerByMobileNumber();
    if (!sellerUser) {
      return null
    } else {
      return sellerUser
    }
  }
}
export const createandGetUser = async (user) =>{
  
  if(user && user.email){
    const seller = new Seller();
    seller.profile.email.value = user.email;
    const sellerUser = await seller.getSellerByEmailId();
    if (!sellerUser) {
      await seller.create();
      return seller
    } else {
      return sellerUser;
    }
  }
  else if(user){
    const number = user.phoneNumber.replace(/\D/g, "").slice(2, 12);
    const seller = new Seller();
    seller.mobile.number = number;
    const sellerUser = await seller.getSellerByMobileNumber();
    if (!sellerUser) {
      await seller.create();
      return seller
    } else {
      return sellerUser
    }
  }
}