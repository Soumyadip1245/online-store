import * as React from "react"
import "./Dashboard.css"
import { useSelector } from "react-redux"
import { createandGetUser } from "../login/Auth"
import { useEffect } from "react"
import Seller from "../../models/seller"
import Order from "../../models/order"
import { useState } from "react"
import Loader from "../../utils/loader/Loader"
import { useQuery } from "react-query"
import ChatService from "../chat/ChatService"
import Stepper from './stepper/Stepper'
import VoiceRecognition from "../../utils/voice-recognition/VoiceRecognition"
import { useSpeak } from "../../utils/voice-recognition/SpeakContext.jsx"
import useLocalData from "../../utils/localSetting"
import Onboarding from "../onboarding/Onboarding.jsx"

const Dashboard = () => {
  const [showChat, setShow] = useState(false)
  const [seller, setSeller] = useState(new Seller())
  const [loader, setLoader] = useState(true)
  const [loaderSeller, setLoaderSeller] = useState(false)
  const [onboarding,setOnboarding] = useState(false)
  const user = useSelector((state) => state.auth.user)
  const { activateVoice } = useLocalData()
  const { speakMessage } = useSpeak()
  let toShow
  const fetchUser = async () => {

    return await createandGetUser(user)
  }
  const { data, isLoading } = useQuery("dashboard", fetchUser, { enabled: !!user })
  useEffect(() => {
    if (data) {

      setSeller(data)
      setLoaderSeller(true)
    }
  }, [data])


  const getDashboard = async () => {

    const orders = await Order.getAllOrdersSeller(data._id);

    const totalOrder = orders.length
    const unpaidOrder = orders.filter(order => !order.isPaid && !order.isRejected).length;
    const totalEarning = orders
      .filter(order => order.isPaid)
      .reduce((total, order) => total + order.totalAmount, 0);
    const pendingOrder = orders.filter(order => !order.isAccepted).length
    const recentOrder = orders.slice(0, 5);

    setLoader(false)
    return { unpaidOrder, totalEarning, pendingOrder, recentOrder, totalOrder }
  }
  const { data: orderData, isLoading: orderLoading } = useQuery("dashboardData", getDashboard, { enabled: loaderSeller })
  const commands = [
    {
      command: "what is my total orders",
      callback: () => {
        speakMessage(`Your total orders are ${orderData.totalOrder}`);

      },
    },
    {
      command: "what is my total earnings",
      callback: () => {
        speakMessage(`your total earnings is rupees ${orderData.totalEarning}`);

      },
    },
    {
      command: "what is my total pending orders",
      callback: () => {
        speakMessage(`your pending order are ${orderData.pendingOrder}`);

      },
    },
    {
      command: "what is my total unpaid orders",
      callback: () => {
        speakMessage(`your total unpaid orders are ${orderData.unpaidOrder}`);

      },
    },
    {
      command: "what is my latest order",
      callback: () => {
        speakMessage(`your latest order is with order number ${orderData.recentOrder[0].orderNumber}`);

      },
    }
  ]
  const handleOnboarding = () => {
    toShow = false
  }
  if (isLoading || orderLoading || loader) return <Loader />

  toShow = !user.isStaff && !(seller.sellerName && seller.paymentDetails.accountNumber)
  return (
    <>
      {!toShow && activateVoice && <VoiceRecognition commands={commands} />}
      { toShow && (
        <Stepper stepperToggle={handleOnboarding}/>
      )}
      {
       !toShow && !seller.isVerified && <Onboarding />
      }
      {(seller.isVerified) &&
        <>
          <div className="dashboard-container">
            <div className="card-design">
              <h5 className="dashboard-heading">Account Statistics</h5>
              <div className="dashboard-counter">
                <div className="counter">
                  <div className="counter-icon">
                    <i class="fa-solid fa-sack-dollar"></i>
                  </div>
                  <div className="counter-value">
                    Rs. {orderData.totalEarning}
                  </div>
                  <p>Total Earnings</p>
                </div>
                <div className="counter">
                  <div className="counter-icon">
                    <i class="fa-solid fa-square-check"></i>
                  </div>
                  <div className="counter-value">
                    {orderData.totalOrder}
                  </div>

                  <p>Total Orders</p>
                </div>
                <div className="counter">
                  <div className="counter-icon">
                    <i class="fa-solid fa-circle-exclamation"></i>
                  </div>
                  <div className="counter-value">
                    {orderData.pendingOrder}
                  </div>
                  <p>Total Pending Orders</p>
                </div>
                <div className="counter">
                  <div className="counter-icon">
                    <i class="fa-solid fa-vault"></i>
                  </div>
                  <div className="counter-value">
                    {orderData.unpaidOrder}
                  </div>
                  <p>Total Unpaid Orders</p>
                </div>
              </div>
            </div>
            <div className="card-design" style={{ flex: 1 }}>
              <h5 className="dashboard-heading">Need Help</h5>
              {showChat && <ChatService />}
              {!showChat && <div className="dashboard-chat">
                <i class="fa-solid fa-comment-slash"></i></div>}
              {!showChat && <div style={{ margin: '2rem auto' }}>
                <button className="btn-design" onClick={() => setShow(true)}>Start</button>
              </div>}
            </div>
          </div>
        </>}
    </>

  )
}

export default Dashboard
