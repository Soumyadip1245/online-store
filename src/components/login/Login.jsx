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

  const sendOtp = async () => {

    const confirmation = await phoneLogin(phone)
    if (confirmation) {
      setConfirmation(confirmation)
      setAvailable(true)
      message.success("OTP sent")
    } else {
      message.warning("Trouble sending the OTP")
    }
  }
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
       <div className="login-header">
       <img src={Logo} alt="logo" width="10%" />
        <h2>Online Stores</h2>
        <div className="projector">
          
        </div>
      </div>
    <div className="login-card">
      <div className="login-form">
        <div className="login-text">
          <h2 className="login-heading">Login to your Account</h2>
          <div className="login-hint">Choose any method of login to account</div>
        </div>
        <div>
          <div className="field-heading">Phone Number</div>
          <input type="text" className="input-field loginfield" placeholder="enter your phone number"/>
        </div>
        <div style={{marginTop: "2rem"}}>
          <div className="field-heading">Enter OTP</div>
          <input type="text" className="input-field loginfield" placeholder="enter OTP"/>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <button className="btn-design login-submit">Submit</button>
        </div>
        <div className="login-hint">You can also login with <a style={{color:"rgba(130, 136, 254, 1)",cursor: 'pointer'}}>Google login</a></div>
      </div>
    </div>
    </div>
   


  )
}

export default Login
