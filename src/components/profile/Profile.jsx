import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Box,
  Badge,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Seller from "../../models/seller";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetUser } from "../login/Auth";
import Loader from "../../utils/loader/Loader";
import VoiceRecognition from "../../utils/voice-recognition/VoiceRecognition";
import { speakMessage } from "../../utils/voice-recognition/Speak";
import { useQuery } from "react-query";
import { message } from "antd";
const Profile = ({ profileSuccess, stepper }) => {
  const [seller, setSeller] = useState(new Seller());
  const [originalSeller, setOriginal] = useState(new Seller());
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
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

  const commands = [
    {
      command: "set seller name to *",
      callback: (sellerName) => {
        speakMessage(`Setting seller name to ${sellerName}`);
        updateFormData("sellerName", sellerName);
      },
    },
    {
      command: "set address to *",
      callback: (address) => {
        speakMessage(`Setting address to ${address}`);
        updateFormData("address", address);
      },
    },
    {
      command: "set city to *",
      callback: (city) => {
        speakMessage(`Setting city to ${city}`);
        updateFormData("city", city);
      },
    },
    {
      command: "set state to *",
      callback: (state) => {
        speakMessage(`Setting state to ${state}`);
        updateFormData("state", state);
      },
    },
    {
      command: "set pincode to *",
      callback: (pincode) => {
        speakMessage(`Setting pincode to ${pincode}`);
        updateFormData("pincode", pincode);
      },
    },
    {
      command: "save profile",
      callback: () => {
        handleSubmit()
      },
    },
  ];
  return (
    <>
      <VoiceRecognition commands={commands} />
      <h4> Profile</h4>

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
                  <p className="written text-wrap">The seller name will be prominently displayed for all visitors to see.</p>

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
                  <p className="written text-wrap">The address will be visible to all visitors accessing your store.</p>

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
                  <p className="written text-wrap">The pincode will be visible to all visitors accessing your store.</p>

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
                  <p className="written text-wrap">The state will be visible to all visitors accessing your store.</p>

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
                  <p className="written text-wrap">The pincode will be visible to all visitors accessing your store.</p>

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
