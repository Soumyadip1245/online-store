import React, { useEffect, useState } from 'react'
import { useStore } from '../store-context/StoreProvider'
import { createOrder, prepareOrder } from './OrderPlace';
import Order from '../../../models/order';
import { pay } from '../../../utils/razorpay';
import { generateInvoice } from '../../../utils/invoice-generator/invoice-generator';
import { useNavigate, useParams } from 'react-router-dom';
import './StoreSummary.css'
import delivery from '../../assests/delivery.png';

const StoreSummary = () => {
  const { unique } = useParams()
  const { cart, setCart, generatedStore } = useStore()
  const [order, setOrder] = useState(new Order())
  const totalAmount = cart.reduce((total, curr) => total + curr.quantity * curr.productPrice, 0);
  const totalQuantity = cart.reduce((total, curr) => total + curr.quantity, 0)
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
  const remove = (curr) => {
    setCart(cart.filter((i) => i.id != curr.id))
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
      generateInvoice(data, generatedStore)
      // navigate(`/${unique}/store-confirm`)
      setOfstage(3);
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
      generateInvoice(data, generatedStore)
      // navigate(`/${unique}/store-confirm`)
      setOfstage(3);
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
  const handlePaymentOptionChange = (option) => {
    setFormData({
      ...formData,
      paymentOption: option,
    });
  };
  const handleBackClick = () => {
    window.location.href = '/';
  };


  useEffect(() => {
    if (ofStage === 3) {
      const timer = setTimeout(() => {
        window.location.href = '/'; 
      }, 4000);
      return () => clearTimeout(timer); 
    }
  }, [ofStage]);
  


  return (
    <>
      {ofStage == 1 && <>
        
        <div>
        <button
          onClick={handleBackClick}
          style={{
            position: 'absolute',
            left:'1rem',
            padding: '0.5rem',
            fontSize: '1.5rem',
            cursor: 'pointer',
            background: '#29292e',
            border: 'none',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '10px',
          }}
        >
          <i className="fa-solid fa-arrow-left" style={{ color: '#7c7c7c' }}></i>
        </button>
        <h1 className="summary-heading" style={{ textAlign: 'center' }}>Cart Items</h1>
        </div>
        <div className='summary-container'>
        
        
          <div className="summary-cart">
            <h1 className='summary-heading'>Cart</h1>
            <div className="summary-cartitems">
              {cart.map(curr => (<div class="summary-products">
                <div class="summary-show">
                  <img src={curr.productImage} alt="Product Image" />
                </div>
                <div class="products1-summary">
                  <p class="product1-name">{curr.productName.length > 15 ? curr.productName.slice(0, 15) + "...." : curr.productName}</p>
                  <p class="product1-price">₹ {curr.productPrice}</p>
                  <div class="quantity-container">
                    <button class="decrement-btn" onClick={() => decreement(curr)}><i class="fa-solid fa-minus" ></i></button>
                    <input type="text" class="quantity-input" value={curr.quantity} readonly />
                    <button class="increment-btn" onClick={() => increement(curr)}><i class="fa-solid fa-plus"></i></button>
                  </div>
                  <a class="remove-link" onClick={() => remove(curr)}>Remove</a>
                </div>
              </div>))}


            </div>
          </div>
          <div className="summary-details">
            <h1 className='summary-heading'>Order Summary</h1>
            <div className="summary-pricing">
              <div className="price-flex">
                <p>Store Name</p>
                <p>Mobile Shop</p>
              </div>
              <div className="price-flex">
                <p>Item Quantity</p>
                <p>{totalQuantity}</p>
              </div>
              <div className="price-flex">
                <p>Shipment Charges</p>
                <p>FREE</p>
              </div>
              <div className="price-flex">
                <p>Coupon Applied</p>
                <p>No</p>
              </div>
              <hr className='hr-background' />
              <div className="price-flex">
                <p>Total Amount</p>
                <p>₹ {totalAmount}</p>
              </div>
              <hr className='hr-background' />
              <button className="storelinkcoloredbutton full-width" onClick={checkout}>Proceed</button>
              <p className='gateway-summary'>Payments by Razorpay gateway</p>
            </div>
          </div>
        </div>
      </>
      }

      {ofStage == 2 &&

        <div className="details-container">
          <div>
          <button
            onClick={handleBackClick}
            style={{
              position: 'absolute',
              
              left: '1rem',

              padding: '0.5rem',
              fontSize: '1.5rem',
              cursor: 'pointer',
              background: '#29292e',
              border: 'none',
              color: '#000',
              display: 'flex',
              justifyContent:'center',
              alignItems: 'center',
              borderRadius: '10px',
            }}
          >
            <i className="fa-solid fa-arrow-left" style={{ color: '#7c7c7c' }}></i>
          </button>
          <h1 className="summary-heading">Checkout Details</h1>
          </div>
          <div className="card-design">
            <form>
              <div className="input-text ">
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="input-field  full-input "
                  name="buyerName"
                  onChange={handleChange} />
                <p className="written text-wrap">Enter the full name that will appear on the invoice. This should be the name of the buyer who is making the purchase.</p>
              </div>
              <div className="input-text ">
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="input-field  full-input"
                  defaultValue={generatedStore.buyer.profile.email.value}
                  name="email"
                  disabled={true} onChange={handleChange} />
                <p className="written text-wrap">Email ID of the customer. This email address will be used for sending order confirmations and updates.</p>
              </div>
              <div className="input-text ">
                <input
                  type="tel"
                  placeholder="Enter Mobile"
                  className="input-field  full-input"
                  name="buyerMobile"
                  onChange={handleChange} />
                <p className="written text-wrap">Enter your mobile number for further communication. We may contact you for order verification or delivery updates.</p>
              </div>
              <div className="input-text ">
                <input
                  type="text"
                  placeholder="Flat Number"
                  className="input-field  full-input"
                  name="flatNumber"
                  onChange={handleChange} />
                <p className="written text-wrap">Provide your flat number or apartment number for delivering the items to your doorstep.</p>
              </div>
              <div className="input-text ">
                <input
                  type="text"
                  placeholder="City"
                  className="input-field  full-input"
                  name="city"
                  onChange={handleChange} />
                <p className="written text-wrap">Enter the city where the delivery will take place. This helps us ensure timely delivery of your order.</p>
              </div>
              <div className="input-text ">
                <input
                  type="text"
                  placeholder="Address"
                  className="input-field  full-input"
                  name="address"
                  onChange={handleChange} />
                <p className="written text-wrap">Enter your complete address including street name and number. This is essential for accurate delivery of your items.</p>
              </div>
              <div className="input-text  ">
                <input
                  type="text"
                  placeholder="Landmark"
                  className="input-field  full-input"
                  name="landmark"
                  onChange={handleChange} />
                <p className="written text-wrap">Provide a nearby landmark to help our delivery personnel locate your address easily.</p>
              </div>
              <div className="input-text  ">
                <textarea
                  type="text"
                  placeholder="Special Instructions"
                  className="input-field  full-input"
                  name="instructions"
                  rows={5}
                  onChange={handleChange} />
                <p className="written text-wrap">Any special instructions for delivery? Let us know if there's anything specific our delivery personnel should be aware of.</p>
              </div>
              <div className="checkout-option">
                {generatedStore.store.isPaynow && (
                  <div
                    className={`option ${formData.paymentOption === 'payNow' ? 'selected' : ''}`}
                    onClick={() => handlePaymentOptionChange('payNow')}
                  >
                    <i className={`fa-solid fa-square-check ${formData.paymentOption === 'payNow' ? 'selected' : ''}`} style={{ color: formData.paymentOption === 'payNow' ? 'green' : 'grey' }}></i>
                    Pay Now
                  </div>
                )}
                {generatedStore.store.isPaylater && (
                  <div
                    className={`option ${formData.paymentOption === 'payLater' ? 'selected' : ''}`}
                    onClick={() => handlePaymentOptionChange('payLater')}
                  >
                    <i className={`fa-regular fa-circle-check ${formData.paymentOption === 'payLater' ? 'selected' : ''}`} style={{ color: formData.paymentOption === 'payLater' ? 'green' : 'grey' }}></i>
                    Pay Later
                  </div>
                )}
              </div>
              <button className="btn-design full-width" type="button" onClick={processOrder}>Proceed Order</button>
            </form>

          </div>
        </div>
      }

      {ofStage === 3 &&

      <div className='order-confirmed'>
        <div className="unique-container">
          <img src={delivery} alt="Order Confirmed" className="unique-confirmation-image" />
          <h1 className="unique-heading">Order Placed Successfully!</h1>
          <p className="unique-paragraph">Thank you for your purchase. Your order has been successfully placed.</p>
        </div>
        </div>

      }
    </>

  )
}

export default StoreSummary