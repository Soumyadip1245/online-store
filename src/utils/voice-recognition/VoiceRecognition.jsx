import React, { useEffect, useState } from 'react';
import './VoiceRecognition.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceRecognition = ({ commands }) => {
  const [isListening, setIsListening] = useState(false);
  const {
    transcript,
    resetTranscript
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (isListening) {
      SpeechRecognition.startListening({ language: 'en-IN' });
    } else {
      SpeechRecognition.stopListening();
    }

    return () => {
      SpeechRecognition.abortListening();
    };
  }, [isListening]);

  const handleKeyDown = (event) => {
    if (event.keyCode === 32 && event.target.tagName !== 'INPUT') {
      event.preventDefault();
      setIsListening(true);
    }
  };

  const handleKeyUp = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
      setIsListening(false);
      resetTranscript();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="voice-recognition-container">

      {isListening && <p className='transcript'>{transcript}</p>}
      {isListening ? (
        <i className="fa-solid fa-microphone"></i>
      ) : (
        <i className="fa-solid fa-microphone-slash"></i>
      )}
    </div>
  );
};

export default VoiceRecognition;
