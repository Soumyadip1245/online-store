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
      command: `set store unique name to *`,
      callback: (name) => {
        updateFormData("uniqueName", name)
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
            <p className="written text-wrap">Store name is visible to all those who will access your store.</p>
          </div>
          <div className="input-text">
            <input type="text" name="uniqueName"
              value={store?.uniqueName}
              onChange={handleChange} placeholder="enter your store unique name" className="input-field" />
            <p className="written text-wrap">Unique name is the name which will be available in your store url. Don't use space or uppercase letters</p>
          </div>
          <div className="input-text">
            <input type="text" name="storeAddress"
              value={store?.storeAddress}
              onChange={handleChange} placeholder="enter your store address" className="input-field" />
            <p className="written text-wrap">Store address is the address of the store.</p>
          </div>
          <div className="input-text">
            <input type="text" name="gstNumber"
              value={store?.gstNumber}
              onChange={handleChange} placeholder="enter your store GST number" className="input-field" />
            <p className="written text-wrap">Store GST number for gst invoice or receipt (OPTIONAL)</p>
          </div>
          <div className="input-text">
            <div className="toggle-card">
              <input type="checkbox" id="toggle" className="input-checkbox" checked={store.isPaynow}
                onChange={handleChange}
                name="isPaynow" />
              <label htmlFor="toggle" className="toggle-button"></label>
              <p style={{ color: 'var(--color-text)', fontWeight: 'bold' }}>Pay Now</p>
            </div>
            <p className="written text-wrap">Enable if you want to enable razorpay payments, and place order only if payment is done.</p>
          </div>
          <div className="input-text">
            <div className="toggle-card">
              <input type="checkbox" id="toggle1" className="input-checkbox" checked={store.isPaylater}
                onChange={handleChange}
                name="isPaylater" />
              <label htmlFor="toggle1" className="toggle-button"></label>
              <p style={{ color: 'var(--color-text)', fontWeight: 'bold' }}>Pay Later</p>
            </div>
            <p className="written text-wrap">Enable if you want customer to place order without paying, and can pay after the order is placed.</p>
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
