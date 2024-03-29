import React, { useEffect, useState } from 'react';
import { Button, Card, List, message } from 'antd';
import date from 'date-and-time';
import Order from '../../../models/order'
import { Row, Col, Timeline, Tag } from 'antd';
import { Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Download } from '@mui/icons-material';
import './OrderSummary.css'
const { Text, Title } = Typography;
const OrderSummary = ({ order, summaryBack, updateOrderStatus, isStore }) => {
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

  const handleInvoice = async () => {
    const invoiceData = await data.downloadUrl(data.orderNumber)

    const downloadLink = document.createElement('a');
    downloadLink.href = invoiceData;
    downloadLink.setAttribute('download', `${data.orderNumber}.pdf`);
    downloadLink.click();
  }
  const acceptOrder = async () => {
    await data.updateAccept()
    setData(Order.toCls({ ...data, isAccepted: true }))
    updateOrderStatus(Order.toCls({ ...data, isAccepted: true }))
    message.success("Order Accepted")
  }
  const rejectOrder = async () => {
    await data.updateReject()
    setData(Order.toCls({ ...data, isRejected: true }))
    updateOrderStatus(Order.toCls({ ...data, isRejected: true }))
    message.success("Order Rejected")
  }
  const paidOrder = async () => {
    await data.updatePaid()
    setData(Order.toCls({ ...data, isPaid: true }))
    updateOrderStatus(Order.toCls({ ...data, isPaid: true }))
    message.success("Order Paid")
  }
  const deliverOrder = async () => {
    if (!data.isOutForreached) {
      setData(Order.toCls({ ...data, isOutForreached: true }))
      updateOrderStatus(Order.toCls({ ...data, isOutForreached: true }))
      await data.updateisOutDelivered()
      message.success("Order out for shipping")
    }
    else {
      await data.updateDelivered()
      setData(Order.toCls({ ...data, isReached: true }))
      updateOrderStatus(Order.toCls({ ...data, isReached: true }))
      message.success("Order Shipped")
    }
  }
  return (
    <div className='order-container'>
      <div className="card-design">
        <h4 className='store-name'>Order Details</h4>
        {/* <p className="written">{data?.orderNumber}</p> */}
        <div className="card-grid">
          <div>
            <div className="order-info">
              <h5 className='heading'>Order Number</h5>
              <p className="written">{data?.orderNumber}</p>
            </div>
            <div className="order-info">
              <h5 className='heading'>Placed On</h5>
              <p className="written">{dateFormat(data.createdAt)}</p>
            </div>
            <div className="order-info">
              <h5 className='heading'>Total Amount</h5>
              <p className="written">Rs. {data.totalAmount}</p>
            </div>
          </div>
          <div className="timeline">
            <Timeline mode="vertical" style={{color: 'var(--color-text', fontWeight: 'bold'}}>

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
           {!isStore && <div className="button-accept">
              {(!data.isRejected && !data.isPaid && (data.isAccepted )) && <button className="btn-design" onClick={paidOrder}>Paid</button>}
              {(!data.isRejected && !data.isOutForreached || !data.isReached) && (data.isAccepted ) && <button className="btn-design" onClick={deliverOrder}>{!data.isOutForreached ? "Out For Delivery" : "Delivered"}</button>}
             { (!data.isAccepted && !data.isRejected) && <>
              <button className="btn-design" onClick={acceptOrder}>Accept</button>
              <button className="btn-design" onClick={rejectOrder}>Reject</button>
             </>}
            </div>}
          </div>
        </div>

        <table className='order-main'>
          <thead>
            <th className='order-th'>Product Name</th>
            <th className='order-th'>Product Price</th>
          </thead>
          <tbody>
            {data.cartItems.map(item => <tr>
              <td className='order-td'>{item.productName.length > 20 ? item.productName.substring(0, 25) + '....' : item.productName}</td>
              <td className='order-td'>{item.productQuantity} x Rs. {item.productPrice}</td>
            </tr>)}
          </tbody>
        </table>
        <div>
          <button className="btn-design" onClick={handleInvoice} >Invoice</button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
