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
import Logo from '../assests/background-image.png'
import { login } from "../../store/authSlice"
import Banner from "../assests/banner.jpg"
import "./Login.css"
import Notify from "../../utils/snackbar/Notify"
import VoiceRecognition from "../../utils/voice-recognition/VoiceRecognition"
import { speakMessage } from "../../utils/voice-recognition/Speak"

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
    
    <Layout className="box-container login" style={{ position: 'relative',minHeight: '100vh' }}>
      
    <div style={{  marginTop: '1rem', left: '50%',  zIndex: '1' }}>
      <h1 className='h1ag'><span>Online</span> Stores</h1>
    </div>
    <Content>
    <VoiceRecognition commands={commands} />
      <Row  justify="center" align="middle">
        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={Logo} alt="Your Image" style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }} />
          </div>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12} style={{ padding: '24px' }}>
         {!isAvailable && <Card title="Login" className="login-card">
            {!checkbox && (
              <>
                <GoogleButton style={{ width: '100%' }} onClick={google} />
                <Divider>OR</Divider>
              </>
            )}

            <PhoneInput
              country={'in'}
              value={phone}
              onChange={(value, country, e, formattedValue) => setPhone(formattedValue)}
              inputStyle={{ width: '100%' }}
            />
             <div id="recaptcha-container" sx={{ mb: 2 }}></div>
            <div style={{ marginTop: 16 }}>
              <Checkbox value={checkbox} onChange={handleCheckbox}>Are you staff?</Checkbox>
            </div>
            <Button onClick={sendOtp} style={{ marginTop: 16 }}>Send OTP</Button>
          </Card>}
          {isAvailable && <Card title="Verify OTP">
          <OTPInput className="otppppp-input" value={otp} onChange={(value) => setValue(value)} autoFocus OTPLength={6} otpType="text" />
          <Button onClick={verifyOtp} style={{ marginTop: 16 }}>Verify OTP</Button>
            </Card>}
        </Col>
      </Row>
    </Content>
  </Layout>

  )
}

export default Login
