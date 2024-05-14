import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const resources = {
  en: {
    translation: {
      profile: {
        "heading1": "Seller name is visible to all those who will access your store.",
        "heading2": "The address will be visible to all visitors accessing your store.",
        "heading3":"The pincode will be visible to all visitors accessing your store.",
        "heading4":"The state will be visible to all visitors accessing your store.",
        "heading5":"The pincode will be visible to all visitors accessing your store.",
      


      },
      sidebar:{
        "sidebar1":"Dashboard",
        "sidebar2":"Store",
        "sidebar3":"Products",
        "sidebar4":"Orders",
        "sidebar5":"Explore",
        "sidebar6":"Rentals",
        "sidebar7":"Access"
      },
      settings:{
        "se1":"Theme",
        "se2":"Enable Voice",
        "se3":"Voice",
        "se4":"Enable the option for activating the voice feature for the app. ",
        "se5":"Select Language",
        "se6":"Set Brightness",
       
      },
      dropdown:{
        "d1":"Contact Support",
        "d2":"Profile",
        "d3":"Payment Details",
        "d4":"Settings",
        "d5":"Logout",

      },
      login:{
        "l1":"Login to your Account",
        "l2":"Choose any method of login to your account.",
        "l3":"Phone Number",
        "l4":"Are you staff?",
        "l5":"Send OTP",
        "l6":"Enter OTP",
        "l7":"Verify OTP"
      }
    
    },
  },
  hi: {
    translation: {
      profile: {
        "heading1": "वह सभी के लिए दिखाई देगा जो आपकी दुकान तक पहुँचेंगे।",
        "heading2":"यह पता आपके स्टोर पर आने वाले सभी आगंतुकों को दिखाई देगा।",
      }
    }
  }
  
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en', 
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
