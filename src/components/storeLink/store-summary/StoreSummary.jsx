import { Avatar, Box, Button, FormControlLabel, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, TextareaAutosize, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useStore } from '../store-context/StoreProvider'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Add, Remove } from '@mui/icons-material';
import { createOrder, prepareOrder } from './OrderPlace';
import Order from '../../../models/order';
import { pay } from '../../../utils/razorpay';
import SearchLocationInput from '../../../utils/google-maps/GooglePlaces';
import MapComponent from '../../../utils/google-maps/Map';
import { generateInvoice } from '../../../utils/invoice-generator/invoice-generator';
import { useNavigate, useParams } from 'react-router-dom';
const StoreSummary = () => {
  const {unique} = useParams()
  const { cart, setCart, generatedStore } = useStore()
  const [order, setOrder] = useState(new Order())
  const totalAmount = cart.reduce((total, curr) => total + curr.quantity * curr.productPrice, 0);
  const [ofStage, setOfstage] = useState(1)
  const [paymentOption, setPayment] = useState('')
  const [formData, setFormData] = useState({
    address: '',
    flatNumber: '',
    landmark: '',
    pincode: '',
    paymentOption: '',
    instructions: '',
    city: ''
  });
  const navigate = useNavigate()
  const increement = (curr) => {
    curr.quantity += 1
    const updated = [...cart]
    const index = cart.findIndex((i) => i.id == curr.id)
    updated[index].quantity = curr.quantity
    setCart(updated)
  }
  const decreement = (curr) => {
    if (curr.quantity == 1) {
      setCart(cart.filter((i) => i.id != curr.id))
      return
    }
    curr.quantity -= 1
    const updated = [...cart]
    const index = cart.findIndex((i) => i.id == curr.id)
    updated[index].quantity = curr.quantity
    setCart(updated)
  }
  const checkout = () => {
    setOfstage(ofStage + 1)
  }
  const processOrder = async () => {
    const orderData = {
      cart: cart,
      totalAmount: totalAmount,
      address: formData.address,
      flatNumber: formData.flatNumber,
      landmark: formData.landmark,
      pincode: formData.pincode,
      paymentOption: formData.paymentOption,
      instructions: formData.instructions,
      city: formData.city,
      buyerMobile: formData.buyerMobile,
      buyerName: formData.buyerName,
      storeDetails: generatedStore
    };
    console.log(orderData)
    const data = await prepareOrder(orderData)

    setOrder(data)
    if (!data.isPaynow) {
      generateInvoice(data,generatedStore)
      navigate(`/${unique}/store-confirm`)
      return
    }
    await paymentOrder(data)
    
  };
  useEffect(() => {

    console.log(generatedStore)
  }, [])
  const paymentOrder = async (data) => {
    const handlePaymentSuccess = async () => {
      await createOrder(data)
      generateInvoice(data,generatedStore)
      navigate(`/${unique}/store-confirm`)
    };

    const handlePaymentFailure = () => {

    };

    const payerInfo = {
      name: data.buyerName,
      email: "-",
      contact: data.buyerMobile || "-",
      address: "-",
    };

    const paymentInfo = {
      amount: data.totalAmount * 100,
      name: "Store Order",
      description: "Payment",
      image: "https://example.com/product-image.jpg",
    };
    await pay(
      paymentInfo,
      payerInfo,
      handlePaymentSuccess,
      handlePaymentFailure,
      generatedStore.seller.paymentDetails.razorpayId
    );
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      {ofStage == 1 && <Box m='1rem 2rem' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        {cart.length > 0 && <Button variant='contained' sx={{ background: '#f02e65', alignSelf: 'flex-end', width: 'fit-content', mb: '2rem' }} onClick={checkout}>Checkout</Button>}
        <TableContainer>
          <Table sx={{ fontSize: '2rem' }} >
            <TableHead>
              <TableRow className='table-rows'>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Product Name</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Category</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Price</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Quantity</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((curr) => (
                <TableRow
                  key={curr._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, padding: '5rem' }}
                >
                  <TableCell scope="row" sx={{ color: 'white' }}>
                    {curr.productName.length > 20 ? curr.productName.substring(0, 20) + '....' : curr.productName}
                  </TableCell>
                  <TableCell align="right" sx={{ color: 'white' }}>{curr.productCategory}</TableCell>
                  <TableCell align="right" sx={{ color: 'white' }}>Rs. {curr.productPrice}</TableCell>
                  <TableCell align="right" sx={{ color: 'white' }}>
                    <div >
                      <IconButton sx={{ color: 'white' }} onClick={() => decreement(curr)}><Remove /></IconButton>
                      {curr.quantity}
                      <IconButton sx={{ color: 'white' }} onClick={() => increement(curr)}><Add /></IconButton>
                    </div>
                  </TableCell>
                  <TableCell align="right" sx={{ color: 'white' }}>Rs. {curr.quantity * curr.productPrice}</TableCell>
                </TableRow>

              ))}
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, padding: '5rem' }}>
                <TableCell colSpan={4} sx={{ color: 'white', fontWeight: 'bold' }}>Total</TableCell>
                <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Rs. {totalAmount}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>}

      {ofStage == 2 &&
        <div className="summary-container">
          {/* <div className="checkout-container"> */}
          <form className="checkout-form">
            <h2>Checkout Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="buyerName" required="" onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" defaultValue={generatedStore.buyer.profile.email.value} disabled={true} onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mobile">Code</label>
                <input
                  type="tel"
                  defaultValue={+91}
                  id="mobile"
                  name="-"
                  disabled={true}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile Number</label>
                <input type="tel" id="mobile" name="buyerMobile" required="" onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="flat">Flat Number</label>
                <input type="text" id="flat" name="flatNumber" required="" onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" required="" onChange={handleChange} />
              </div>
            </div>
            <div className="form-row full-width">
              <div className="form-group">
                <label htmlFor="address">Pincode</label>
                <input type="text" id="address" name="pincode" onChange={handleChange} required="" />
              </div>
            </div>
            <div className="form-row full-width">
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" onChange={handleChange} required="" />
              </div>
            </div>
            <div className="form-row full-width">
              <div className="form-group">
                <label htmlFor="landmark">Landmark</label>
                <input type="text" id="landmark" name="landmark" required="" onChange={handleChange} />
              </div>
            </div>
            <div className="form-row full-width">
              <div className="form-group">
                <label htmlFor="instructions">Special Instructions</label>
                <textarea
                  id="instructions"
                  name="instructions"
                  rows={5}
                  defaultValue={""}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* New Landmark Field */}

            <div className="payment-method">
              <div className="payment-options">
                {generatedStore.store.isPaynow && <label className="payment-option razorpay-option">
                  <input
                    type="radio"
                    name="paymentOption"
                    value="payNow"
                    id="payRazorpay"
                    onChange={handleChange}
                  />
                  <span className="payment-text">Pay Now</span>
                  <img
                    src="https://d6xcmfyh68wv8.cloudfront.net/newsroom-content/uploads/2022/07/Razorpay_payments.png"
                    alt="Razorpay Logo"
                    className="payment-logo"
                  />
                  <span className="checkmark" />
                </label>}
                {generatedStore.store.isPaylater && <label className="payment-option pay-later-option">
                  <input
                    type="radio"
                    name="paymentOption"
                    value="payLater"
                    id="payLater"
                    onChange={handleChange}
                  />
                  <span className="payment-text">Pay Later</span>
                  <img
                    src="https://img.freepik.com/free-vector/hand-drawn-hand-holding-banknotes-drawing-illustration_23-2150909254.jpg"
                    alt="Pay Later"
                    className="payment-logo"
                  />
                  <span className="checkmark" />
                </label>}
              </div>
            </div>
            <button type="button" className="submit-btn" onClick={processOrder}>
              Place Order
            </button>
          </form>
        </div>
      }
    </>

  )
}

export default StoreSummary