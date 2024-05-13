import React, { useEffect, useState } from "react";
import Store from "../../models/store";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green } from "@mui/material/colors";
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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import VoiceRecognition from "../../utils/voice-recognition/VoiceRecognition";
import { message } from 'antd';
import { storeRoute } from "../../utils/store-name";
const StoreDetails = ({ store: initialStore, onSubmitSuccess, storeSuccess, editGetting, stepper, edit }) => {
  const [originalStore, setOriginal] = useState(new Store())
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [image, setImage] = useState(null)
  const [store, setStore] = useState({
    storeName: initialStore.storeName || "",
    uniqueName: initialStore.uniqueName || "",
    storeAddress: initialStore.storeAddress || "",
    gstNumber: initialStore.gstNumber || "",
    isPaynow: initialStore.isPaynow || false,
    isPaylater: initialStore.isPaylater || false,
    storeImage: initialStore.storeImage || ""
  });
  useEffect(() => {

    setOriginal(initialStore);
  }, [initialStore]);
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    
    if(name == 'storeName'){
      const route = storeRoute(value)
      setStore((prevStore) => ({
        ...prevStore,
        storeName: value,
        uniqueName: route
      }));
      return
    }
    setStore((prevStore) => ({
      ...prevStore,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const updateFormData = (fieldName, value) => {

    setStore((prevStore) => ({
      ...prevStore,
      [fieldName]: value,
    }));
  };
  const handleSubmit = async () => {
    originalStore.storeImage = image || store.storeImage
    originalStore.storeName = store.storeName
    originalStore.storeAddress = store.storeAddress
    originalStore.gstNumber = store.gstNumber
    originalStore.isPaylater = store.isPaylater
    originalStore.isPaynow = store.isPaynow
    originalStore.uniqueName = store.uniqueName
    await originalStore.updateStore();
    message.success("Store details saved successfully");
    stepper ? storeSuccess() : edit ? editGetting() : onSubmitSuccess()
  };
  const imageHandler = async (event) => {
    try {
      setLoading(true);
      const data = await originalStore.uploadImage(event.target.files[0]);
      setImage(data)
      setUploadSuccess(true);
      message.success("Image uploaded")
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };
  const commands = [
    {
      command: `set store name to *`,
      callback: (name) => {
        updateFormData("storeName", name)
      },
    },
    {
      command: `set store address to *`,
      callback: (name) => {
        updateFormData("storeAddress", name)
      },
    },
    {
      command: `set gst number to *`,
      callback: (name) => {
        updateFormData("gstNumber", name)
      },
    },
    {
      command: "Enable Pay now for store",
      callback: () => {
        updateFormData("isPaynow", true)
      },
    },
    {
      command: "Enable Pay later for store",
      callback: () => {
        updateFormData("isPaylater", true)
      },
    },
    {
      command: "Disable Pay now for store",
      callback: () => {
        updateFormData("isPaynow", false)
      },
    },
    {
      command: "Disable Pay later for store",
      callback: () => {
        updateFormData("isPaylater", false)
      },
    },
    {
      command: "Save Details",
      callback: () => {
        handleSubmit()
      },
    },

  ];
  return (
    <>
      <VoiceRecognition commands={commands} />
      <h4>Store Details</h4>
      <div className="storedetails-container">

        <div className="card-design">
          <p className="store-name">Store Details</p>
          <div className="input-text">
            <input type="text" name="storeName"
              value={store?.storeName}
              onChange={handleChange} placeholder="enter your store name" className="input-field" />
            <p className="written text-wrap">Your store's name will be prominently displayed for all visitors to see.</p>
          </div>
          <div className="input-flex">
           <p className="written">{store.uniqueName}</p>
           <i class="fa-solid fa-circle-check" style={{color: "green",marginLeft: '10px', display: 'flex', alignItems: 'center'}}></i>
          </div>
           <p className="written text-wrap">Your store unique name by which other can access your stores.</p>
          <div className="input-text">
            <input type="text" name="storeAddress"
              value={store?.storeAddress}
              onChange={handleChange} placeholder="enter your store address" className="input-field" />
            <p className="written text-wrap">The store address is where you'll find us located.</p>
          </div>
          <div className="input-text">
            <input type="text" name="gstNumber"
              value={store?.gstNumber}
              onChange={handleChange} placeholder="enter your store GST number" className="input-field" />
            <p className="written text-wrap">Enter your store's GST number for accurate invoicing and receipts (OPTIONAL)</p>
          </div>
          <div className="input-text">
            <div className="toggle-card">
              <input type="checkbox" id="toggle" className="input-checkbox" checked={store.isPaynow}
                onChange={handleChange}
                name="isPaynow" />
              <label htmlFor="toggle" className="toggle-button"></label>
              <p style={{ color: 'var(--color-text)', fontWeight: 'bold' }}>Pay Now</p>
            </div>
            <p className="written text-wrap">Opt to activate Razorpay payments for seamless transactions. Orders will be processed upon successful payment.</p>
          </div>
          <div className="input-text">
            <div className="toggle-card">
              <input type="checkbox" id="toggle1" className="input-checkbox" checked={store.isPaylater}
                onChange={handleChange}
                name="isPaylater" />
              <label htmlFor="toggle1" className="toggle-button"></label>
              <p style={{ color: 'var(--color-text)', fontWeight: 'bold' }}>Pay Later</p>
            </div>
            <p className="written text-wrap">Enable the option for customers to place orders without immediate payment. They can complete the payment after placing the order.</p>
          </div>
          <div className="input-text">
            <input name="fileInput" type="file" accept="image/*" onChange={imageHandler} className="imagedrop" />
            <p className="written text-wrap">Choose image for your store.</p>
          </div>
          <button className="btn-design" type="button" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </>
  );
};

export default StoreDetails;
