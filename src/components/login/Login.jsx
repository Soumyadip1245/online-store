import React, { useEffect, useState } from "react"
import { phoneLogin, googleLogin } from "./Auth"
import "./Login.css"
import VoiceRecognition from "../../utils/voice-recognition/VoiceRecognition"
import { useSpeak } from "../../utils/voice-recognition/SpeakContext.jsx"
import Header from '../Header';
import { useTranslation } from "react-i18next";
import useLocalData from "../../utils/localSetting"
import voiceCommands from "../commands/loginCommand"
import { notifyError, notifySuccess, notifyWarning } from "../../utils/notification/Notification"
const questions = [
  { field: 'phone', prompt: 'कृपया अपना फ़ोन नंबर दर्ज करें' },
  { field: 'otp', prompt: 'अपने OTP को दर्ज करें' }
];

const Login = () => {
  const { t } = useTranslation();
  const { activateVoice } = useLocalData()
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const { speakMessage } = useSpeak()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [isPromptActive, setIsPromptActive] = useState(false);
  const [checkbox, setCheckbox] = useState(localStorage.getItem("isStaff") === "true")
  const [confirmation, setConfirmation] = useState(null)
  const [isAvailable, setAvailable] = useState(false)
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isStaff, setIsStaff] = useState(localStorage.getItem("isStaff") === "true");

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith("+91")) {
      setPhone(`+91${value.replace(/^(\+91)?/i, "")}`); // Ensure "+91" at the start
    } else {
      setPhone(value);
    }
  };

  const sendOtp = async () => {
  
    try {
      console.log(phone.replace(/\s/g, ''))
      const confirmationResult = await phoneLogin(phone.replace(/\s/g, ''));
      // Ensure proper setup
      if (confirmationResult) {
        setConfirmation(confirmationResult);
        setIsOtpSent(true);
        notifySuccess("OTP sent successfully.");
        speakMessage("OTP sent")
      } else {
        notifyWarning("Trouble sending OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error); // Log the error for debugging
      notifyError("An error occurred while sending OTP. Please try again later.");
    }
  };
  const sendOtp11 = async (phone1) => {
  
    try {
      console.log(phone1.replace(/\s/g, ''))
      const confirmationResult = await phoneLogin(phone1.replace(/\s/g, ''));
      // Ensure proper setup
      if (confirmationResult) {
        setConfirmation(confirmationResult);
        setIsOtpSent(true);
        notifySuccess("OTP sent successfully.");
        speakMessage("OTP sent")
      } else {
        notifyWarning("Trouble sending OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error); // Log the error for debugging
      notifyError("An error occurred while sending OTP. Please try again later.");
    }
  };

  const google = async () => {
    const data = await googleLogin()

    if (data) {
      notifySuccess("LoggedIn successfully")
    } else {
      notifyWarning("Something went wrong from google authentication")
    }
  }
  const handleCheckbox = (e) => {
    const isChecked = e.target.checked
    if (isChecked) {
      localStorage.setItem("isStaff", true)
    } else {
      localStorage.removeItem("isStaff")
    }
    setCheckbox(isChecked)
  }
 
  const verifyOtp = async () => {
    try {
      await confirmation.confirm(otp)
      notifySuccess("OTP Verified")
    } catch (error) {
      notifyError("Wrong OTP")
    }
  }
  const verifyOtp11 = async (otp1) => {
    try {
      await confirmation.confirm(otp1)
      notifySuccess("OTP Verified")
    } catch (error) {
      notifyError("Wrong OTP")
    }
  }
  const setValue = (value) => {
    setOtp(value)
  }

  const handleVoiceResponse = async (response) => {
    speakMessage(response)
    if (!response) return;
    const currentQuestion = questions[currentQuestionIndex];
    console.log(currentQuestionIndex)
    if (currentQuestionIndex == 0) {
      await sendOtp11(`+91${response.trim()}`)
      speakMessage("ओटीपी आपके नंबर पर भेज दिया गया है।")
    }
    

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      speakMessage(questions[currentQuestionIndex + 1].prompt);
    } else {
      setIsPromptActive(false);
      await verifyOtp11(response.trim())
    }
  };
  const startPromptSequence = () => {
    setIsPromptActive(true);
    setCurrentQuestionIndex(0);
    speakMessage(questions[0].prompt);
  };
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        startPromptSequence()
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
  const commands = voiceCommands(speakMessage, sendOtp, verifyOtp, setPhone, setOtp, google, handleVoiceResponse);
  return (
    <>
      {activateVoice && <VoiceRecognition commands={commands} />}

      <Header hideHeaderRight={true} />
      <div className="login-container gray-theme">
        <div className="login-card">
          <div className="login-form">
            <div className="login-text">
              <h2 className="login-heading">{t('login.l1')}</h2>
              <div className="login-hint">{t('login.l2')}</div>
            </div>

            {!isOtpSent ? (
              <>
                <div>
                  <div className="field-heading">{t('login.l3')}</div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="input-field-loginfield"
                    placeholder="Enter your phone number"
                    maxLength={13}
                  />
                </div>
                <div id="recaptcha-container" sx={{ mb: 2 }}></div>
                <div style={{ marginTop: 16, display: 'flex', color: '#fff', fontWeight: '700' }}>
                  
                <div className="input-text gray-theme">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      className="input-field"
                      checked={checkbox}
                      onChange={handleCheckbox}
                    />
                    {t('login.l4')}
                  </label>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button onClick={sendOtp} className="btn-design login-submit">{t('login.l5')}</button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="field-heading">{t('login.l6')}</div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="input-field-loginfield"
                    placeholder="Enter OTP"
                    maxLength={6}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button onClick={verifyOtp} className="btn-design login-submit">{t('login.l7')}</button>
                </div>
              </>
            )}

            <div className="login-hint">
              You can also login with
              <a onClick={googleLogin} style={{ color: "rgba(130, 136, 254, 1)", cursor: 'pointer' }}>  Google login</a>.
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login


