import React, { useEffect, useState } from 'react';
import { Button, Card, List, message } from 'antd';
import date from 'date-and-time';
import Order from '../../../models/order'
import { Row, Col, Timeline, Tag } from 'antd';
import { Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Download } from '@mui/icons-material';
const { Text, Title } = Typography;
const OrderSummary = ({ order,summaryBack,updateOrderStatus,isStore }) => {
  const [data, setData] = useState(new Order())
  useEffect(() => {
    setData(Order.toCls(order))
  }, [order]);
  const dateFormat = (createdAt) => {
    const nowe = new Date(createdAt);
    return date.format(nowe, 'DD MMM hh:mm A');
  }
  const handleGoBack = () => {
    summaryBack()
  }

  const handleInvoice = async () =>{
    const invoiceData = await data.downloadUrl(data.orderNumber)

    const downloadLink = document.createElement('a');
    downloadLink.href = invoiceData;
    downloadLink.setAttribute('download', `${data.orderNumber}.pdf`); 
    downloadLink.click();
  }
  const acceptOrder = async () =>{
    await data.updateAccept()
    setData(Order.toCls( { ...data, isAccepted: true }))
    updateOrderStatus(Order.toCls( { ...data, isAccepted: true }))
    message.success("Order Accepted")
  }
  const rejectOrder = async () =>{
    await data.updateReject()
    setData(Order.toCls( { ...data, isRejected: true }))
    updateOrderStatus(Order.toCls( { ...data, isRejected: true }))
    message.success("Order Rejected")
  }
  const paidOrder = async () =>{
    await data.updatePaid()
    setData( Order.toCls({ ...data, isPaid: true }))
    updateOrderStatus( Order.toCls({ ...data, isPaid: true }))
    message.success("Order Paid")
  }
  const deliverOrder = async () =>{
    if(!data.isOutForreached) {
      setData( Order.toCls({ ...data, isOutForreached: true }))
      updateOrderStatus( Order.toCls({ ...data, isOutForreached: true }))
      await data.updateisOutDelivered()
      message.success("Order out for shipping")
    }
    else{
      await data.updateDelivered()
      setData( Order.toCls({ ...data, isReached: true }))
      updateOrderStatus( Order.toCls({ ...data, isReached: true }))
      message.success("Order Shipped")
    }
  }
  return (
    <>

    <div style={{display: 'flex',justifyContent: 'space-between'}}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => handleGoBack()} />
      <Button icon={<Download />} onClick={() => handleInvoice()} />

    </div>
      <Card style={{ marginTop: 16 }} type="inner" title="Order Details" headStyle={{ backgroundColor: '#bdbdbd47' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontWeight: 'bold' }}>Order number: {data?.orderNumber}</h2>
            <p>Placed on {dateFormat(data.createdAt)}</p>
          </div>
          <div>
            <h3 style={{ fontWeight: 'bold' }}>
              <span style={{ color: 'grey' }}>Total:</span> Rs.{data.totalAmount}
            </h3>
          </div>
        </div>
      </Card>
      <Row gutter={16} style={{ marginTop: '1rem' }}>
        <Col xs={false} sm={false} md={18} lg={18} xl={18}>
          <Card style={{ marginBottom: 16 }} type="inner" title="Product Details" headStyle={{ backgroundColor: '#bdbdbd47' }}>
            <List
              size="small"
              dataSource={data.cartItems}
              renderItem={(item, index) => (
                <List.Item>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div>
                      <Text strong style={{ marginRight: '7px' }}>{index + 1}.</Text>
                      <Text strong>{item.productName}</Text>
                    </div>
                    <div>
                      <Text strong>{item.productQuantity} x Rs.{item.productPrice}</Text>
                    </div>
                  </div>
                </List.Item>
              )}
            />

          </Card>
        </Col>
        <Col xs={false} sm={false} md={6} lg={6} xl={6}>
          <Card style={{ marginBottom: 16 }} type="inner" title="Order Summary" headStyle={{ backgroundColor: '#bdbdbd47' }}>
            <Row justify="space-between">
              <Row span={24} md={20} className="hh-grayBox pt45 pb20">
                <Timeline mode="vertical">

                  {!data.isRejected && <>
                    <Timeline.Item color={data.isAccepted ? "green" : "blue"}>Accepted</Timeline.Item>
                    <Timeline.Item color={data.isPaid ? "green" : "blue"}>Paid</Timeline.Item>
                    <Timeline.Item color={data.isOutForreached ? "green" : "blue"}>Out For Delivery</Timeline.Item>
                    <Timeline.Item color={data.isReached ? "green" : "blue"}>Delivered</Timeline.Item>
                  </>}
                  {data.isRejected && <>
                    <Timeline.Item color="red">Rejected</Timeline.Item>
                  </>}
                </Timeline>
              </Row>
            </Row>
           {!isStore && <>
            {(!data.isAccepted && !data.isRejected) && <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <Button type="primary" style={{ marginRight: '1rem' }} onClick={acceptOrder}>Accept</Button>
              <Button danger onClick={rejectOrder}>Reject</Button>
            </div>}
            {<div style={{ marginTop: '1rem', textAlign: 'center' }}>
              {(!data.isRejected && !data.isPaid && (data.isAccepted )) && <Button type="primary" style={{ marginRight: '1rem' }} onClick={paidOrder}>Paid</Button>}
              {(!data.isRejected && !data.isOutForreached || !data.isReached) && (data.isAccepted ) &&  <Button type="primary" style={{ marginRight: '1rem' }} onClick={deliverOrder}>{!data.isOutForreached ? "Out For Delivery" : "Delivered"}</Button>}
            </div>}
            </>}
           
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderSummary;
