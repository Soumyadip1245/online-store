import React, { useEffect, useState } from "react"
import OTPInput from "otp-input-react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Truck from '../assests/truck.jpg'
// import { AppBar, Box, Toolbar, Typography, IconButton, Button, TextField, Divider, FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import SuccessAlert from "../../utils/alert/SuccessAlert"
import GoogleButton from "react-google-button"
import MenuIcon from "@mui/icons-material/Menu"
import PhoneInput from "react-phone-input-2"
import { phoneLogin, googleLogin, GetUser } from "./Auth"
import "react-phone-input-2/lib/style.css"
import Loader from "../../utils/loader/Loader"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../store/authSlice"
import Banner from "../assests/banner.jpg"
import "./Login.css"
import Notify from "../../utils/snackbar/Notify"
import VoiceRecognition from "../../utils/voice-recognition/VoiceRecognition"
import { speakMessage } from "../../utils/voice-recognition/Speak"
import Logo from '../assests/INFINITY-removebg-preview.png'
import { Layout, Row, Col, Form, Input, Button, Checkbox, Divider, Card, message } from 'antd';

const { Content } = Layout;
const Login = () => {
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [checkbox, setCheckbox] = useState(false)
  const [confirmation, setConfirmation] = useState(null)
  const [isAvailable, setAvailable] = useState(false)
  const [isOtpSent, setIsOtpSent] = useState(false);


  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith("+91")) {
      setPhone(`+91${value.replace(/^(\+91)?/i, "")}`); // Ensure "+91" at the start
    } else {
      setPhone(value);
    }
  };

  const sendOtp = async () => {
    if (phone.length < 13) { // Phone number with country code should be at least 13 characters
      message.warning("Please enter a valid phone number with country code.");
      return;
    }

    try {
      const confirmationResult = await phoneLogin(phone); // Ensure proper setup
      if (confirmationResult) {
        setConfirmation(confirmationResult);
        setIsOtpSent(true);
        message.success("OTP sent successfully.");
      } else {
        message.warning("Trouble sending OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error); // Log the error for debugging
      message.error("An error occurred while sending OTP. Please try again later.");
    }
  };

  const google = async () => {
    const data = await googleLogin()

    if (data) {
      message.success("LoggedIn successfully")
    } else {
      message.warning("Something went wrong from google authentication")
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
      message.success("OTP Verified")
    } catch (error) {
      message.warning("Wrong OTP")
    }
  }
  const setValue = (value) => {
    setOtp(value)
  }
  const commands = [
    {
      command: "google login",
      callback: () => {
        speakMessage("Google login")
        google()
      },
    },
    {
      command: "phone number is *",
      callback: (number) => {
        speakMessage("Phone number entered is " + number)
        setPhone("+91" + number)
      },
    },
    {
      command: "send otp",
      callback: () => {
        sendOtp()
      },
    },
    {
      command: "otp is *",
      callback: (number) => {
        setOtp(number)
      },
    },
    {
      command: "verify otp",
      callback: () => {
        verifyOtp()
      },
    },
  ]

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-form">
          <div className="login-text">
            <h2 className="login-heading">Login to your Account</h2>
            <div className="login-hint">Choose any method of login to your account.</div>
          </div>

          {!isOtpSent ? (
            <>
              <div>
                <div className="field-heading">Phone Number</div>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="input-field loginfield"
                  placeholder="Enter your phone number"
                />
              </div>
              <div id="recaptcha-container" sx={{ mb: 2 }}></div>
              <div style={{ marginTop: 16 }}>
                <Checkbox value={checkbox} style={{ color: 'rgba(255, 255, 255, 1)' }} onChange={handleCheckbox}>Are you staff?</Checkbox>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={sendOtp} className="btn-design login-submit">Send OTP</button>
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="field-heading">Enter OTP</div>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="input-field loginfield"
                  placeholder="Enter OTP"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={verifyOtp} className="btn-design login-submit">Verify OTP</button>
              </div>
            </>
          )}

          <div className="login-hint">
            You can also login with
            <a onClick={googleLogin} style={{ color: "rgba(130, 136, 254, 1)", cursor: 'pointer' }}>Google login</a>.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login


