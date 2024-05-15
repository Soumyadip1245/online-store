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
        "se4":"Enable the option for activating the voice feature for the app",
        "se5":"Select Language",
        "se6":"Set Brightness",
        "se7":"Open Job Oppurtunities",
        "se8":"Jobs",
        "se9":"Enable the option for activating the jobs feature for the app"
       
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
      "profile": {
        "heading1": "विक्रेता का नाम वह सभी दिखाई देगा जो आपकी दुकान तक पहुँचेंगे।",
        "heading2": "पता वह सभी दिखाई देगा जो आपकी दुकान तक पहुँचेंगे।",
        "heading3": "पिन कोड वह सभी दिखाई देगा जो आपकी दुकान तक पहुँचेंगे।",
        "heading4": "राज्य वह सभी दिखाई देगा जो आपकी दुकान तक पहुँचेंगे।",
        "heading5": "पिन कोड वह सभी दिखाई देगा जो आपकी दुकान तक पहुँचेंगे।"
      },
      "sidebar": {
        "sidebar1": "डैशबोर्ड",
        "sidebar2": "स्टोर",
        "sidebar3": "उत्पाद",
        "sidebar4": "आदेश",
        "sidebar5": "अन्वेषण",
        "sidebar6": "किराया",
        "sidebar7": "पहुँच"
      },
      "settings": {
        "se1": "थीम",
        "se2": "आवाज सक्षम करें",
        "se3": "आवाज",
        "se4": "ऐप के लिए आवाज सुविधा को सक्रिय करने का विकल्प सक्षम करें।",
        "se5": "भाषा चुनें",
        "se6": "चमक निर्धारित करें",
        "se7":"खुले नौकरी के अवसर",
        "se8": "नौकरियां",
        "se9": "ऐप के लिए नौकरियां सुविधा को सक्रिय करने का विकल्प सक्षम करें",

      },
      "dropdown": {
        "d1": "समर्थन से संपर्क करें",
        "d2": "प्रोफ़ाइल",
        "d3": "भुगतान विवरण",
        "d4": "सेटिंग्स",
        "d5": "लॉगआउट"
      },
      "login": {
        "l1": "अपने खाते में लॉगिन करें",
        "l2": "अपने खाते में लॉगिन करने का कोई भी तरीका चुनें।",
        "l3": "फ़ोन नंबर",
        "l4": "क्या आप कर्मचारी हैं?",
        "l5": "OTP भेजें",
        "l6": "OTP दर्ज करें",
        "l7": "OTP सत्यापित करें"
      }
    }
    
  },
  bn:{
    translation:{
      "profile": {
        "heading1": "বিক্রেতার নাম সেই সবার দেখানো হবে যারা আপনার দোকানে অ্যাক্সেস করবেন।",
        "heading2": "ঠিকানা সেই সবার দেখানো হবে যারা আপনার দোকানে অ্যাক্সেস করবেন।",
        "heading3": "পিনকোড সেই সবার দেখানো হবে যারা আপনার দোকানে অ্যাক্সেস করবেন।",
        "heading4": "রাজ্য সেই সবার দেখানো হবে যারা আপনার দোকানে অ্যাক্সেস করবেন।",
        "heading5": "পিনকোড সেই সবার দেখানো হবে যারা আপনার দোকানে অ্যাক্সেস করবেন।"
      },
      "sidebar": {
        "sidebar1": "ড্যাশবোর্ড",
        "sidebar2": "স্টোর",
        "sidebar3": "পণ্য",
        "sidebar4": "অর্ডার",
        "sidebar5": "অন্বেষণ",
        "sidebar6": "রেন্টাল",
        "sidebar7": "অ্যাক্সেস"
      },
      "settings": {
        "se1": "থিম",
        "se2": "ভয়েস সক্ষম করুন",
        "se3": "ভয়েস",
        "se4": "অ্যাপের জন্য ভয়েস বৈশিষ্ট্যটি সক্রিয় করার অপশন সক্রিয় করুন।",
        "se5": "ভাষা নির্বাচন করুন",
        "se6": "উজ্জ্বলতা সেট করুন",
        "se7":"খোলা চাকরির সুযোগ",
        "se8": "চাকরি",
        "se9": "অ্যাপের জন্য চাকরি বৈশিষ্ট্যটি সক্রিয় করার বিকল্প সক্রিয় করুন",
      },
      "dropdown": {
        "d1": "সমর্থনে যোগাযোগ করুন",
        "d2": "প্রোফাইল",
        "d3": "পেমেন্ট বিবরণ",
        "d4": "সেটিংস",
        "d5": "লগ আউট"
      },
      "login": {
        "l1": "আপনার অ্যাকাউন্টে লগইন করুন",
        "l2": "আপনার অ্যাকাউন্টে লগইনের কোনও পদ্ধতি চয়ন করুন।",
        "l3": "ফোন নম্বর",
        "l4": "আপনি কর্মচারী?",
        "l5": "OTP পাঠান",
        "l6": "OTP প্রবেশ করান",
        "l7": "OTP যাচাই করুন"
      }
    }
    
  },
  ml:{
    translation:{
      "profile": {
        "heading1": "വിൽപനക്കാരുടെ പേര് അവരുടെ ദുകാണത്തിൽ അഡ്മിറ്റ് ചെയ്യുന്നവരെ കാണാനും.",
        "heading2": "അഡ്രസ് അവരുടെ ദുകാണത്തിൽ അവസാനിക്കുന്ന സന്ദർഭങ്ങളിൽ കാണാനും.",
        "heading3": "പിൻകോഡ് അവരുടെ ദുകാണത്തിൽ അവസാനിക്കുന്ന സന്ദർഭങ്ങളിൽ കാണാനും.",
        "heading4": "സംസ്ഥാനം അവരുടെ ദുകാണത്തിൽ അവസാനിക്കുന്ന സന്ദർഭങ്ങളിൽ കാണാനും.",
        "heading5": "പിൻകോഡ് അവരുടെ ദുകാണത്തിൽ അവസാനിക്കുന്ന സന്ദർഭങ്ങളിൽ കാണാനും."
      },
      "sidebar": {
        "sidebar1": "ഡാഷ്ബോർഡ്",
        "sidebar2": "സ്റ്റോർ",
        "sidebar3": "ഉൽപ്പന്നങ്ങൾ",
        "sidebar4": "ഓർഡർകൾ",
        "sidebar5": "അന്വേഷിക്കുക",
        "sidebar6": "ലാവാസുകൾ",
        "sidebar7": "ആക്സസ്"
      },
      "settings": {
        "se1": "തീം",
        "se2": "വോയ്സ് സജ്ജമാക്കുക",
        "se3": "വോയ്സ്",
        "se4": "ആപ്പിന്റെ വോയ്സ് സവിശേഷത സജ്ജമമാക്കാൻ ഓപ്ഷൻ സജ്ജീകരിക്കുക.",
        "se5": "ഭാഷ തിരഞ്ഞെടുക്കുക",
        "se6": "പ്രകാശം സജ്ജമാക്കുക",
        "se7":"തുറക്കുന്ന ജോലി അവസരങ്ങൾ",
        "se8": "ജോലികൾ",
        "se9": "അപ്ലിക്കേഷൻറെ ജോലികൾ സജീവമാക്കുകയാണെങ്കിൽ ശബ്ദ സാധ്യതയുടെ ഓപ്ഷനുകൾ സജീവമാക്കുക"
      },
      "dropdown": {
        "d1": "സപ്പോർട്ട് സംപർക്കുക",
        "d2": "പ്രൊഫൈൽ",
        "d3": "പേമെന്റ് വിവരങ്ങൾ",
        "d4": "ക്രമീകരണങ്ങൾ",
        "d5": "ലോഗ് ഔട്ട്"
      },
      "login": {
        "l1": "നിങ്ങളുടെ അക്കൗണ്ടിലേക്ക് ലോഗിൻ ചെയ്യുക",
        "l2": "നിങ്ങളുടെ അക്കൗണ്ടിലേക്ക് ലോഗിൻ ചെയ്യാൻ ഏതെങ്കിലും രീതി തിരഞ്ഞെടുക്കുക.",
        "l3": "ഫോൺ നമ്പർ",
        "l4": "നിങ്ങൾ സ്റ്റാഫാണോ?",
        "l5": "OTP അയയ്ക്കുക",
        "l6": "OTP നൽകുക",
        "l7": "OTP പരിശോധിക്കുക"
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
