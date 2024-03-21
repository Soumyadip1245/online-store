import { AppBar, Box, Button, CircularProgress, IconButton, Toolbar, Typography } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import * as dayjs from "dayjs";
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetUser } from '../../login/Auth';
import Seller from '../../../models/seller';
import Rental from '../../../models/rental';
import { SelectAllRounded } from '@mui/icons-material';
import { pay } from '../../../utils/razorpay';
import Loader from '../../../utils/loader/Loader';
import VoiceRecognition from '../../../utils/voice-recognition/VoiceRecognition';
import { speakMessage } from '../../../utils/voice-recognition/Speak';
import { useMutation, useQuery } from 'react-query';
import { message } from 'antd';
const Rentals = () => {
  const [rentals, setRentals] = useState([])
  const [seller, setSeller] = useState(new Seller())
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true)

  const fetchData = async () => {
    const userData = await GetUser(user);
    const rentalData =  await Rental.getAllRentalBySeller(userData._id)
    return {userData,rentalData}
  };
  const { data, isLoading } = useQuery("rentals", fetchData, { enabled: !!user })
  useEffect(() => {
    if (data){
      setRentals(data.rentalData)
      setSeller(data.userData)
    }
  })
  const purchase = async () => {
   
    const handlePaymentSuccess = async () => {
      await mutation.mutateAsync();
      message.success("Payment successful, subscription will be updated shortly")
    };

    const handlePaymentFailure = () => {
      message.warning("Payment cancelled")
    };

    const payerInfo = {
      name: seller.sellerName,
      email: seller.profile.email.value || "-",
      contact: seller.mobile.number || "-",
      address: "Mentioned",
    };

    const paymentInfo = {
      amount: 50000,
      name: "Subscription",
      description: "Subscription",
      image: "https://example.com/product-image.jpg",
    };
    await pay(
      paymentInfo,
      payerInfo,
      handlePaymentSuccess,
      handlePaymentFailure
    );
  }
  const commands = [
    {
      command: "Rental Status",
      callback: () => {
        const paidTillDate = new Date(rentals[0].endDate);
        const dateFormat = paidTillDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });


        if (seller.istheSubscriptionAvailable) {

          speakMessage(`currently you are on ${rentals[0].type} type till ${dateFormat} `);
        }
        else {
          speakMessage(`subscription ended on ${dateFormat}`);
        }
      },
    },
    {
      command: "Purchase Rentals",
      callback: () => {
        purchase()
      },
    }

  ];
  const mutation = useMutation(async () => {
    const today = new Date()
    const rentalData = new Rental();
    rentalData.startDate = today.getTime() <= new Date(rentals[0].endDate).getTime() ? rentals[0].endDate : today.toISOString();
    rentalData.endDate = Seller.months(rentalData.startDate);
    rentalData.type = "Premium";
    rentalData.sellerId = seller._id;
    
    await rentalData.create();
    
    
    seller.paidTill = rentalData.endDate;
    await seller.updateRental();
    
    return rentalData;
});


  if (isLoading) return <Loader />
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <VoiceRecognition commands={commands} />

      {/* {loader && <Loader/>} */}
      {!isLoading && <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "column", justifyContent: "space-between" }}>
        <Box m={2} >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f2f2f2' }}>
                  <TableCell>Rental</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Purchased On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rentals.map((curr) => {
                  return <TableRow key={curr._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" >
                      {curr.type == 'Free' ? "Free" : "Paid"}
                    </TableCell>
                    <TableCell >{dayjs(curr.startDate).format('DD/MM/YYYY')}</TableCell>
                    <TableCell >{dayjs(curr.endDate).format('DD/MM/YYYY')}</TableCell>
                    <TableCell >₹ {curr.type == 'Free' ? "0" : "500"}</TableCell>
                    <TableCell >{dayjs(curr.createdAt).format('DD/MM/YYYY')}</TableCell>
                  </TableRow>
                })}


              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Button variant="contained" onClick={purchase}>Purchase</Button>
      </Box>}

    </Box>
  )
}

export default Rentals