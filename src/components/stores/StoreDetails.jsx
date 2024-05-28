import React, { useEffect, useState } from "react";
import Store from "../../models/store";
import VoiceRecognition from "../../utils/voice-recognition/VoiceRecognition";
import { storeRoute } from "../../utils/store-name";
import './StoreShow.css';
import { storeCommands } from "../commands/storeCommands";
import useLocalData from "../../utils/localSetting";
import { notifyError, notifySuccess } from "../../utils/notification/Notification";
import { useSpeak } from "../../utils/voice-recognition/SpeakContext";
const questions = [
  { field: 'storeName', prompt: 'आपके स्टोर का नाम क्या है?' },
  { field: 'storeAddress', prompt: 'आपके स्टोर का पता क्या है?' },
  { field: 'gstNumber', prompt: 'आपके स्टोर का जीएसटी नंबर क्या है?' }
];

const StoreShow = ({ store: initialStore, onSubmitSuccess, storeSuccess, editGetting, stepper, edit }) => {
  const [originalStore, setOriginal] = useState(new Store())
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [isPromptActive, setIsPromptActive] = useState(false);
  const [image, setImage] = useState(null)
  const { activateVoice } = useLocalData()
  const {speakMessage} = useSpeak()
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

    if (name === 'storeName') {
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

    try {
      await originalStore.updateStore();
      const details = `
        प्रोफाइल विवरण सफलतापूर्वक अपडेट किया गया।
        स्टोर का नाम: ${store.storeName}.
        पता: ${store.storeAddress}.
        जीएसटी नंबर: ${store.gstNumber ? store.gstNumber : 'नहीं है'}.
        अभी भुगतान करें: ${store.isPaynow ? 'हां' : 'नहीं'}.
        बाद में भुगतान करें: ${store.isPaylater ? 'हां' : 'नहीं'}.
      `;
      speakMessage(details);
      notifySuccess("Store details saved successfully");
      if (stepper) {
        storeSuccess();
      } else {
        edit ? editGetting() : onSubmitSuccess();
      }
    } catch (error) {
      notifyError("Not able to save store details");
    }
  };

  const imageHandler = async (event) => {
    try {
      setLoading(true);
      const data = await originalStore.uploadImage(event.target.files[0]);
      setImage(data);
      setUploadSuccess(true);
      notifySuccess("Image uploaded");
    } catch (error) {
      console.error("Error uploading image:", error);
      notifyError("Not able to upload image");
    } finally {
      setLoading(false);
    }
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
    speakMessage(questions[0].prompt)
  }
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        startPromptSequence()
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
  const commands = storeCommands(updateFormData, handleSubmit,handleVoiceResponse);
  return (
    <>
      {activateVoice && <VoiceRecognition commands={commands} />}
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
          {store.storeName && <div className="input-flex">
            <p className="written">{store.uniqueName}</p>
            <i class="fa-solid fa-circle-check" style={{ color: "green", marginLeft: '10px', display: 'flex', alignItems: 'center' }}></i>
          </div>}
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

export default StoreShow;
