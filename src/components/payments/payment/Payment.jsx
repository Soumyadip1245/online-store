import React, { useEffect, useState } from "react";
import Seller from "../../../models/seller";
import { useSelector } from "react-redux";
import { GetUser } from "../../login/Auth";
import PaymentDetails from "../payment-details/PaymentDetails";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
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
  CardMedia,
} from "@mui/material";
import Loader from "../../../utils/loader/Loader";
import { useQuery } from "react-query";
const Payment = () => {
  const [seller, setSeller] = useState(new Seller());
  const [image, setImage] = useState("");
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    return await GetUser(user);
  };
  const { data, isLoading } = useQuery("payment", fetchData,{enabled: !!user})
  useEffect(() => {
    if (data) {
      setSeller(data)
    }
  }, [data])

  if(isLoading) return <Loader/>
  return !seller.paymentDetails.isEntered ? (
    <PaymentDetails />
  ) : (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit">
              <ExitToAppIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Payment Details
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Box m={2} >
        <Card display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <CardContent>
            <Grid container spacing={2}>
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
                      color={
                        seller.paymentDetails.isVerified ? "success" : "warning"
                      }
                      badgeContent={
                        seller.paymentDetails.isVerified
                          ? "Verified"
                          : "Waiting"
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
            </Grid>
          </CardContent>

        </Card>
        <Box mt={2}>
          <Card>
            <CardContent>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h8" fontWeight="bold">
                    Bank Name
                  </Typography>
                  <Typography variant="body1">
                    {seller.paymentDetails.bankName || "Not provided"}
                  </Typography>
                  <Typography variant="h8" fontWeight="bold">
                    Account Number
                  </Typography>
                  <Typography variant="body1">
                    {seller.paymentDetails.accountNumber || "Not provided"}
                  </Typography>
                  <Typography variant="h8" fontWeight="bold">
                    IFSC Code
                  </Typography>
                  <Typography variant="body1">
                    {seller.paymentDetails.ifscCode || "Not provided"}
                  </Typography>
                  <Typography variant="h8" fontWeight="bold">
                    Branch
                  </Typography>
                  <Typography variant="body1">
                    {seller.paymentDetails.branch || "Not provided"}
                  </Typography>
                  <Typography variant="h8" fontWeight="bold">
                    Link
                  </Typography>
                  <Typography variant="body1">
                    {seller.paymentDetails.upiLink || "Not provided"}
                  </Typography>
                </Box>

                <Box>
                  <CardMedia
                    component="img"
                    src={seller.imageUrl}
                    alt="QR Code"
                    style={{ height: 200, width: "auto" }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default Payment;
