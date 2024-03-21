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
import { Badge, Layout, List, Progress, Space, Typography } from "antd"
import { Card, Row, Col } from 'antd';
import ChatService from "../chat/ChatService"
// import { Stepper } from "@mui/material"
import Stepper from './stepper/Stepper'
import VoiceRecognition from "../../utils/voice-recognition/VoiceRecognition"
import { speakMessage } from "../../utils/voice-recognition/Speak"

const Dashboard = () => {
  const [seller, setSeller] = useState(new Seller())
  const [graph, setGraph] = useState(null)
  const [loader, setLoader] = useState(true)
  const [loaderSeller, setLoaderSeller] = useState(false)
  const user = useSelector((state) => state.auth.user)
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
  const stepperLoad = (data) => {
    setSeller(data)
  }
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

  if (isLoading || orderLoading || loader) return <Loader />


  return (
    <>
    <VoiceRecognition commands={commands}/>
      {!user.isStaff && (!seller.sellerName || !seller.paymentDetails.accountNumber) && (
        <Stepper stepperToggle={stepperLoad} />
      )}
      {(seller.sellerName && seller.paymentDetails.accountNumber) && <>
        <Row gutter={16} justify="center" style={{ margin: '1rem', backgroundColor: 'transparent' }}>
          <Col span={6}>
            <Card headStyle={{ backgroundColor: '#bdbdbd47' }}
              title="Total Orders"
              style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}
            >
              {orderData.totalOrder}
            </Card>
          </Col>
          <Col span={6}>
            <Card headStyle={{ backgroundColor: '#bdbdbd47' }}
              title="Total Earnings"
              style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}
            >
              Rs. {orderData.totalEarning}
            </Card>
          </Col>
          <Col span={6}>
            <Card headStyle={{ backgroundColor: '#bdbdbd47' }}
              title="Pending Orders"
              style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}
            >
              {orderData.pendingOrder}
            </Card>
          </Col>
          <Col span={6}>
            <Card headStyle={{ backgroundColor: '#bdbdbd47' }}
              title="Unpaid Orders"
              style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}
            >
              {orderData.unpaidOrder}
            </Card>
          </Col>
        </Row>
        <Row gutter={16} justify="center" style={{ margin: '1rem', backgroundColor: 'transparent' }}>
          <Col span={18}>
            <Card
              headStyle={{ backgroundColor: '#bdbdbd47' }}
              title="Need Help"
              style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}
            >
              <ChatService />
            </Card>
          </Col>
          <Col span={6}>
            <Card
              headStyle={{ backgroundColor: '#bdbdbd47' }}
              title="Recent Orders"
            >
              <List
                dataSource={orderData.recentOrder}
                renderItem={(item, index) => (
                  <List.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <Typography.Text>#{item.orderNumber}</Typography.Text>
                    </div>
                    <div>
                      {item.isAccepted ? (
                        <Badge status="success" />
                      ) : item.isRejected ? <Badge status='error' /> : <Badge status='warning' />}
                    </div>
                  </List.Item>
                )}
              />


            </Card>
          </Col>
        </Row>





      </>}
    </>

  )
}

export default Dashboard
