import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const resources = {
  en: {
    translation: {
      profile: {
        "heading1": "Seller name is visible to all those who will access your store."
      }
    },
  },
  hi: {
    translation: {
      profile: {
        "heading1": "वह सभी के लिए दिखाई देगा जो आपकी दुकान तक पहुँचेंगे।"
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
