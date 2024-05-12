import { AppBar, Box, Button, CircularProgress, IconButton, Toolbar, Typography } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import * as dayjs from "dayjs";
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';
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
import "./Rentals.css";
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
  const AcceptedDot = styled('span')({
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#17b31b',
    marginRight: '5px',
  });
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
    <>
          {/* <VoiceRecognition commands={commands} /> */}

    <div className="container">
      
      
      {!isLoading && (
        <div className="content-container">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr className="table-row">
                  <th>Rental</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Amount</th>
                  <th>Purchased On</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((curr) => (
                  <tr key={curr._id} className="table-row">
                    <td><><AcceptedDot/>{curr.type === 'Free' ? "Free" : "Paid"}</></td>
                    <td>{new Date(curr.startDate).toLocaleDateString('en-IN')}</td>
                    <td>{new Date(curr.endDate).toLocaleDateString('en-IN')}</td>
                    <td>₹ {curr.type === 'Free' ? "0" : "500"}</td>
                    <td>{new Date(curr.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
          <button className="purchase-button" onClick={purchase}>Purchase</button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default Rentals