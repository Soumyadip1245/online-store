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
import axios from 'axios'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Seller from "../../../models/seller";
import { useSelector } from "react-redux";
import { GetUser } from "../../login/Auth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green } from "@mui/material/colors";
import { Payer, checkFunction, pay } from "../../../utils/razorpay";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendMail } from "../../../utils/mail";
import Loader from "../../../utils/loader/Loader";
import { useQuery } from "react-query";
import { message } from "antd";
const PaymentDetails = ({ paymentSuccess, stepper }) => {
  const [seller, setSeller] = useState(new Seller());
  const [loading, setLoading] = useState(false);
  const [originalSeller, setOriginal] = useState(new Seller());
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const fetchData = async () => {
    return await GetUser(user);
  };
  const { data, isLoading } = useQuery("payment", fetchData, { enabled: !!user })

  const handleSubmit = async () => {
    originalSeller._id = seller._id;
    originalSeller.paymentDetails.bankName = seller.paymentDetails.bankName
    originalSeller.paymentDetails.accountNumber = seller.paymentDetails.accountNumber
    originalSeller.paymentDetails.ifscCode = seller.paymentDetails.ifscCode
    originalSeller.paymentDetails.branch = seller.paymentDetails.branch
    originalSeller.paymentDetails.upiLink = seller.paymentDetails.upiLink
    originalSeller.paymentDetails.isEntered = true;
    console.log("Original Seller: ", originalSeller, seller)

    // const response = await axios.post("https://upiqr.in/api/qr", {
    //   "name": seller.sellerName,
    //   "vpa": seller.paymentDetails.upiLink
    // })
    // console.log(response.data)
    // const data = await seller.uploadImage(response.data);
    console.log(data)
    await originalSeller.updatePayment();
    message.success("Details updated")
    if (stepper) {
      paymentSuccess(seller);
    }
    else {
      navigate('/dashboard')
    }

  };
  useEffect(() => {
    if (data) {
      setSeller(data)
    }
  }, [data])
  const imageHandler = async (event) => {
    try {
      setLoading(true);
      const data = await seller.uploadImage(event.target.files[0]);
      seller.paymentDetails.qrImage = data;
      seller.imageUrl = await seller.downloadUrl(data)
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


    console.log(seller)
  };

  return (
    <>

      {isLoading ? <Loader /> :
        <Box m={2}>
          {seller.paymentDetails.isEntered && (
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  {/* Seller details on the left side */}
                  <Grid item xs={12} sm={8}>
                    <Box>
                      <Typography
                        variant="h8"
                        gutterBottom
                        fontWeight="bold"
                        style={{ marginBottom: 0 }}
                      >
                        Razorpay Account
                      </Typography>
                      <Box ml={4} mt={1} mb={1} mr={4}>
                        <Badge
                          color={seller.paymentDetails.isVerified ? "success" : "warning"}
                          badgeContent={
                            seller.paymentDetails.isVerified ? "Verified" : "Waiting"
                          }
                        />
                      </Box>
                      <Typography variant="body1">
                        Account ID:{" "}
                        {seller.paymentDetails.razorpayId
                          ? seller.paymentDetails.razorpayId
                          : "Not Assigned"}
                      </Typography>
                    </Box>
                  </Grid>
                  {/* Image on the right side, responsive for mobile */}
                  <Grid item xs={12} sm={4}>
                    <Box display="flex" justifyContent="flex-end">
                      <img
                        src={seller.imageUrl}
                        alt="Razorpay Logo"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

          )}

          <form style={{ marginTop: "20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="bankName"
                  label="Bank Name"
                  variant="outlined"
                  fullWidth
                  required
                  disabled={seller.paymentDetails.isEntered}
                  value={seller.paymentDetails.bankName
                  }
                  onChange={(e) => updateFormData("bankName", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="accountNumber"
                  label="Account Number"
                  variant="outlined"
                  fullWidth
                  required
                  disabled={seller.paymentDetails.isEntered}
                  value={seller.paymentDetails.accountNumber
                  }
                  onChange={(e) => updateFormData("accountNumber", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="ifscCode"
                  label="IFSC Code"
                  variant="outlined"
                  fullWidth
                  required
                  disabled={seller.paymentDetails.isEntered}
                  value={
                    seller.paymentDetails.ifscCode
                  }
                  onChange={(e) => updateFormData("ifscCode", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="branch"
                  label="Branch"
                  variant="outlined"
                  fullWidth
                  required
                  disabled={seller.paymentDetails.isEntered}
                  value={seller.paymentDetails.branch
                  }
                  onChange={(e) => updateFormData("branch", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="upiLink"
                  label="UPI ID"
                  variant="outlined"
                  fullWidth
                  required
                  disabled={seller.paymentDetails.isEntered}
                  value={seller.paymentDetails.upiLink
                  }
                  onChange={(e) => updateFormData("upiLink", e.target.value)}
                />
              </Grid>
              {/* {!seller.paymentDetails.isEntered && <Grid item xs={12} sm={6}>
                <input
                  name="fileInput"
                  onChange={imageHandler}
                  type="file"
                  accept="image/*"
                  required
                />
                {loading && (
                  <CircularProgress size={20} style={{ marginLeft: "8px" }} />
                )}
                {uploadSuccess && (
                  <CheckCircleIcon
                    style={{ color: green[500], marginLeft: "8px" }}
                  />
                )}
              </Grid>} */}

            </Grid>

            {!seller.paymentDetails.isEntered && <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ marginTop: "20px" }}
            >
              Submit
            </Button>}
          </form>
        </Box>}
    </>
  );
};

export default PaymentDetails;
