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
  const [image,setImage] = useState(null)
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
      <form >
        <Box m={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Store Details</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Store Name"
                name="storeName"
                value={store?.storeName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Store Link Unique Name"
                name="uniqueName"
                value={store?.uniqueName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                name="storeAddress"
                value={store?.storeAddress}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="GST Number"
                name="gstNumber"
                value={store?.gstNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={store.isPaynow}
                    onChange={handleChange}
                    name="isPaynow"
                  />
                }
                label="Pay Now"
              />
              <FormControlLabel
                control={
                  <Checkbox

                    checked={store.isPaylater}
                    onChange={handleChange}
                    name="isPaylater"
                  />
                }
                label="Pay Later"
              />
            </Grid>

            {
              <Grid item xs={12} sm={6}>
                <input
                  name="fileInput"
                  onChange={imageHandler}
                  type="file"
                  accept="image/*"
                />
                {loading && (
                  <CircularProgress size={20} style={{ marginLeft: "8px" }} />
                )}
                {uploadSuccess && (
                  <CheckCircleIcon
                    style={{ color: green[500], marginLeft: "8px" }}
                  />
                )}
              </Grid>
            }
            <Grid item xs={12}>
              <Button type="button" onClick={handleSubmit} variant="contained" color="primary">
                {edit ? "Edit" : "Save"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
};

export default StoreDetails;
