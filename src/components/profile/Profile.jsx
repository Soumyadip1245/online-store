import React, { useEffect, useState } from "react";
import Seller from "../../models/seller";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetUser } from "../login/Auth";
import Loader from "../../utils/loader/Loader";
import VoiceRecognition from "../../utils/voice-recognition/VoiceRecognition";
import { useSpeak } from "../../utils/voice-recognition/SpeakContext.jsx";
import { useQuery } from "react-query";
import { notifySuccess, notifyError } from "../../utils/notification/Notification"; // Importing the notification functions
import voiceCommands from "../commands/profileCommand";
import { useTranslation } from "react-i18next";
import useLocalData from "../../utils/localSetting";
const questions = [
  { field: 'sellerName', prompt: 'आपका नाम क्या है?' },
  { field: 'address', prompt: 'आपका पता क्या है?' },
  { field: 'city', prompt: 'आपका शहर क्या है?' },
  { field: 'state', prompt: 'आपका राज्य क्या है?' },
  { field: 'pincode', prompt: 'आपका पिन कोड क्या है?' }
];

const Profile = ({ profileSuccess, stepper }) => {
  const [seller, setSeller] = useState(new Seller());
  const [originalSeller, setOriginal] = useState(new Seller());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [isPromptActive, setIsPromptActive] = useState(false);
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { activateVoice } = useLocalData();
  const { speakMessage } = useSpeak()

  const fetchData = async () => {
    return await GetUser(user);
  };

  const { data, isLoading } = useQuery("profile", fetchData, { enabled: !!user });

  useEffect(() => {
    if (data) setSeller(data);
  }, [data]);

  const handleSubmit = async () => {
    originalSeller._id = seller._id;
    originalSeller.profile.address = seller.profile.address;
    originalSeller.profile.city = seller.profile.city;
    originalSeller.profile.state = seller.profile.state;
    originalSeller.profile.pincode = seller.profile.pincode;
    originalSeller.sellerName = seller.sellerName;

    try {
      await originalSeller.updateProfile();
      const details = `
  प्रोफाइल विवरण सफलतापूर्वक अपडेट किया गया।
  विक्रेता का नाम: ${seller.sellerName}.
  पता: ${seller.profile.address}.
  शहर: ${seller.profile.city}.
  राज्य: ${seller.profile.state}.
  पिन कोड: ${seller.profile.pincode}.
`;
      speakMessage(details);

      notifySuccess('Details updated successfully'); // Display success notification
      stepper ? profileSuccess() : navigate('/dashboard');
    } catch (error) {
      notifyError('Details not updated successfully'); // Display error notification
    }
  };



  const updateFormData = (fieldName, value) => {
    setSeller((prevSeller) => {
      if (fieldName === 'sellerName') {
        return {
          ...prevSeller,
          [fieldName]: value,
          profile: {
            ...prevSeller.profile,
          },
        };
      } else {
        return {
          ...prevSeller,
          profile: {
            ...prevSeller.profile,
            [fieldName]: value,
          },
        };
      }
    });
  };
  const handleVoiceResponse = (response) => {
    speakMessage(response)
    if (!response) return;
    const currentQuestion = questions[currentQuestionIndex];
    updateFormData(currentQuestion.field, response.trim());
    const newResponses = { ...responses, [currentQuestion.field]: response.trim() };
    setResponses(newResponses);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      speakMessage(questions[currentQuestionIndex + 1].prompt);
    } else {
      setIsPromptActive(false);
      handleSubmit();
    }
  };
  const startPromptSequence = () => {
    setIsPromptActive(true);
    setCurrentQuestionIndex(0);
    speakMessage(questions[0].prompt);
  };
  const commands = voiceCommands(speakMessage, updateFormData, handleSubmit, handleVoiceResponse);
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        startPromptSequence()
        // speakMessage("वॉयस सिस्टम के साथ बातचीत करने के लिए, 'phone number is,' 'send OTP,' 'OTP is,' 'verify OTP,' और 'Google login' जैसे कमांड कहें। बस अपने कीबोर्ड पर स्पेसबार दबाएं, जो पुश-टू-टॉक बटन के रूप में काम करता है।")
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
  if (isLoading) return <Loader />;
  return (
    <>
      {activateVoice && <VoiceRecognition commands={commands} />}
      {!isLoading && (
        <div>
          <form>
            <div className="storedetails-container">
              <div className="card-design">
                <p className="store-name">Profile</p>
                <div className="input-text">
                  <input
                    type="text"
                    placeholder="Enter your seller name"
                    className="input-field"
                    name="sellerName"
                    value={seller.sellerName}
                    onChange={(e) => updateFormData("sellerName", e.target.value)}
                  />
                  <p className="written text-wrap">{t('profile.heading1')}</p>
                </div>
                <div className="input-text">
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className="input-field"
                    name="address"
                    value={seller.profile.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                  />
                  <p className="written text-wrap">{t('profile.heading2')}</p>
                </div>
                <div className="input-text">
                  <input
                    type="text"
                    placeholder="Enter your city"
                    className="input-field"
                    name="city"
                    value={seller.profile.city}
                    onChange={(e) => updateFormData("city", e.target.value)}
                  />
                  <p className="written text-wrap">{t('profile.heading3')}</p>
                </div>
                <div className="input-text">
                  <input
                    type="text"
                    name="state"
                    placeholder="Enter your state"
                    className="input-field"
                    value={seller.profile.state}
                    onChange={(e) => updateFormData("state", e.target.value)}
                  />
                  <p className="written text-wrap">{t('profile.heading4')}</p>
                </div>
                <div className="input-text">
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Enter your pincode"
                    className="input-field"
                    value={seller.profile.pincode}
                    onChange={(e) => updateFormData("pincode", e.target.value)}
                  />
                  <p className="written text-wrap">{t('profile.heading5')}</p>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn-design"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Profile;
