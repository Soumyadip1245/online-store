import React, { useEffect, useState } from "react";
// import {localData} from '../../utils/localSetting'
import Seller from "../../models/seller";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetUser } from "../login/Auth";
import Loader from "../../utils/loader/Loader";
import VoiceRecognition from "../../utils/voice-recognition/VoiceRecognition";
import { speakMessage } from "../../utils/voice-recognition/Speak";
import { useQuery } from "react-query";
import { message } from "antd";
import voiceCommands from "../commands/profileCommand";
import { useTranslation } from "react-i18next";
import i18n from "../../utils/i18n";
import useLocalData from "../../utils/localSetting";
const Profile = ({ profileSuccess, stepper }) => {
  const [seller, setSeller] = useState(new Seller());
  const [originalSeller, setOriginal] = useState(new Seller());

  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const {activateVoice} = useLocalData()
  const fetchData = async () => {
    return await GetUser(user);
  };
  const { data, isLoading } = useQuery("profile", fetchData, { enabled: !!user })

  useEffect(() => {
    if (data) setSeller(data)
  }, [data])
  const handleSubmit = async (event) => {

    originalSeller._id = seller._id;
    // event.preventDefault();

    originalSeller.profile.address = seller.profile.address
    originalSeller.profile.city = seller.profile.city;
    originalSeller.profile.state = seller.profile.state;
    originalSeller.profile.pincode = seller.profile.pincode;
    originalSeller.profile.state = seller.profile.state;
    originalSeller.sellerName = seller.sellerName;
    await originalSeller.updateProfile();
    message.success("Details updated")
    stepper ? profileSuccess() : navigate('/dashboard')

  }
  if (isLoading) return <Loader />
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
  const commands = voiceCommands(speakMessage, updateFormData, handleSubmit);
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
                    placeholder="enter your seller name"
                    className="input-field"
                    name="sellerName"
                    value={seller.sellerName}
                    onChange={(e) => updateFormData("sellerName", e.target.value)}
                  />
                  <p className="written text-wrap">{t('profile.heading1')}</p>
                  {/* <button className="btn-design" type="button" onClick={()=>i18n.changeLanguage('hi')}>Language</button> */}
                </div>
                <div className="input-text">
                  <input
                    type="text"
                    placeholder="enter your address"
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
                    placeholder="enter your city"
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
                    placeholder="enter your state"
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
                    placeholder="enter your pincode"
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
