const voiceCommands = (speakMessage, sendOtp, verifyOtp, setPhone, setOtp,google,handleVoiceResponse) => [
  {
    command: "*",
    callback: (sellerName) => {
      handleVoiceResponse(sellerName)
    },
  },  
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
  export default voiceCommands;