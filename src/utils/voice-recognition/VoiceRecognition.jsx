import React, { useEffect } from 'react';
import './VoiceRecognition.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicIcon from '@mui/icons-material/Mic';
import MicOff from '@mui/icons-material/MicOff';
const VoiceRecognition = ({ commands }) => {
  const {
    transcript,
    listening,
  } = useSpeechRecognition( {commands} );


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 32 && event.target.tagName !== "INPUT") {
        event.preventDefault();
        if (!listening) {
          SpeechRecognition.startListening({ language: "en-IN" });
        } else {
          SpeechRecognition.stopListening();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [listening]);



  return (
    <div className="voice-recognition-container">
      {/* {listening && <p>{transcript}</p>} */}
    {listening && <i class="fa-solid fa-microphone"></i>}
    {!listening && <i class="fa-solid fa-microphone-slash"></i>}
  </div>
  
  );
};

export default VoiceRecognition;
