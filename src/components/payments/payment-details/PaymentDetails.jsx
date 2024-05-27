import React, { useEffect, useState } from "react";
import Seller from "../../../models/seller";
import { useSelector } from "react-redux";
import { GetUser } from "../../login/Auth";
import { useNavigate } from "react-router-dom";
import Loader from "../../../utils/loader/Loader";
import { useQuery } from "react-query";
import VoiceRecognition from "../../../utils/voice-recognition/VoiceRecognition";
import { notifySuccess, notifyError } from "../../../utils/notification/Notification";
import './PaymentDetails.css';
import { paymentCommands } from "../../commands/paymentCommands";
import useLocalData from "../../../utils/localSetting";
import { useSpeak } from "../../../utils/voice-recognition/SpeakContext";

const PaymentDetails = ({ paymentSuccess, stepper }) => {
  const [seller, setSeller] = useState(new Seller());
  const [loading, setLoading] = useState(false);
  const [originalSeller, setOriginal] = useState(new Seller());
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const {activateVoice} = useLocalData()
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const {speakMessage} = useSpeak()
  const fetchData = async () => {
    return await GetUser(user);
  };

  const { data, isLoading } = useQuery("payment", fetchData, { enabled: !!user });

  const handleSubmit = async () => {
    originalSeller._id = seller._id;
    originalSeller.paymentDetails.bankName = seller.paymentDetails.bankName;
    originalSeller.paymentDetails.accountNumber = seller.paymentDetails.accountNumber;
    originalSeller.paymentDetails.ifscCode = seller.paymentDetails.ifscCode;
    originalSeller.paymentDetails.branch = seller.paymentDetails.branch;
    originalSeller.paymentDetails.upiLink = seller.paymentDetails.upiLink;
    originalSeller.paymentDetails.isEntered = true;

    try {
      await originalSeller.updatePayment();
      const details = `
      भुगतान विवरण सफलतापूर्वक अपडेट किया गया।
      बैंक का नाम: ${originalSeller.paymentDetails.bankName}.
      खाता संख्या: ${originalSeller.paymentDetails.accountNumber}.
      IFSC कोड: ${originalSeller.paymentDetails.ifscCode}.
      शाखा: ${originalSeller.paymentDetails.branch}.
      UPI लिंक: ${originalSeller.paymentDetails.upiLink}.
    `;
    speakMessage(details)
      notifySuccess("Details updated successfully");
      if (stepper) {
        paymentSuccess(seller);
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      notifyError("Failed to update details");
    }
  };

  useEffect(() => {
    if (data) {
      setSeller(data);
    }
  }, [data]);

  const imageHandler = async (event) => {
    try {
      setLoading(true);
      const data = await seller.uploadImage(event.target.files[0]);
      seller.paymentDetails.qrImage = data;
      seller.imageUrl = await seller.downloadUrl(data);
      setUploadSuccess(true);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (fieldName, value) => {
    setSeller((prevSeller) => ({
      ...prevSeller,
      paymentDetails: {
        ...prevSeller.paymentDetails,
        [fieldName]: value,
      },
    }));
  };

  const commands = paymentCommands(updateFormData, handleSubmit);

  return (
    <>
      {activateVoice && <VoiceRecognition commands={commands} />}
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="payment-container">
          <div className="card-design">
            <p className="payment-name">Payment Details</p>
            <div className="payment-flex">
              <div className="payment-column">
                <p className="written rz">
                  {seller.paymentDetails.razorpayId ? seller.paymentDetails.razorpayId : "Not Assigned"}
                </p>
                <p className="written">
                  This is your unique Razorpay account ID generated, allowing your customers to make secure payments through the Razorpay gateway.
                </p>
              </div>
              <div>
                <div className="badges">
                  {seller.paymentDetails.isVerified ? "Verified" : "Waiting"}
                </div>
              </div>
            </div>
          </div>
          <div className="card-design">
            <p className="store-name">Payment Details</p>
            <div className="input-text">
              <input
                type="text"
                name="bankName"
                disabled={seller.paymentDetails.isEntered}
                value={seller.paymentDetails.bankName}
                onChange={(e) => updateFormData("bankName", e.target.value)}
                placeholder="Enter your bank name"
                className="input-field"
              />
              <p className="written text-wrap">Please provide the name of your bank for seamless settlement of all payments.</p>
            </div>
            <div className="input-text">
              <input
                type="text"
                name="accountNumber"
                disabled={seller.paymentDetails.isEntered}
                value={seller.paymentDetails.accountNumber}
                onChange={(e) => updateFormData("accountNumber", e.target.value)}
                placeholder="Enter your account number"
                className="input-field"
              />
              <p className="written text-wrap">Kindly provide your account number to facilitate seamless settlement of all payments.</p>
            </div>
            <div className="input-text">
              <input
                type="text"
                name="ifscCode"
                disabled={seller.paymentDetails.isEntered}
                value={seller.paymentDetails.ifscCode}
                onChange={(e) => updateFormData("ifscCode", e.target.value)}
                placeholder="Enter your IFSC code"
                className="input-field"
              />
              <p className="written text-wrap">Please provide the IFSC code to ensure smooth settlement of all payments.</p>
            </div>
            <div className="input-text">
              <input
                type="text"
                name="branch"
                disabled={seller.paymentDetails.isEntered}
                value={seller.paymentDetails.branch}
                onChange={(e) => updateFormData("branch", e.target.value)}
                placeholder="Enter your bank branch"
                className="input-field"
              />
              <p className="written text-wrap">Please specify the branch to facilitate smooth settlement of all payments.</p>
            </div>
            <div className="input-text">
              <input
                type="text"
                name="upiLink"
                disabled={seller.paymentDetails.isEntered}
                value={seller.paymentDetails.upiLink}
                onChange={(e) => updateFormData("upiLink", e.target.value)}
                placeholder="Enter your UPI ID"
                className="input-field"
              />
              <p className="written text-wrap">Kindly provide your UPI ID to ensure seamless settlement of all payments.</p>
            </div>
            <div>
              <button className="btn-design" type="button" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentDetails;
