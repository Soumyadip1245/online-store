import React, { useState } from 'react';
import './OrderList.css'; // Import CSS file for styling
import date from 'date-and-time';
import OrderSummary from '../order-summary/OrderSummary';
import styled from '@emotion/styled';
import VoiceRecognition from '../../../utils/voice-recognition/VoiceRecognition';
import { speakMessage } from '../../../utils/voice-recognition/Speak';

const OrderList = ({ orders, openSummary, themeMode }) => {
  const [filter, setFilter] = useState('all');
  const [orderSummary, setOrders] = useState(null);

  const dateFormat = (createdAt) => {
    const now = new Date(createdAt);
    return date.format(now, 'ddd, MMM DD YYYY');
  }
  const PendingDot = styled('span')({
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#fab73b',
    marginRight: '5px',
  });

  const AcceptedDot = styled('span')({
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#17b31b',
    marginRight: '5px',
  });

  const RejectedDot = styled('span')({
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#e74c3c',
    marginRight: '5px',
  });

  const OrderLink = styled('a')({
    cursor: 'pointer',
    
  });

  const filterOrders = (status) => {
    return status === 'all' ? orders : orders.filter(order => {
      return (status === 'accepted' && order.isAccepted) ||
        (status === 'rejected' && order.isRejected) ||
        (status === 'pending' && !order.isAccepted && !order.isPaid) ||
        (status === 'paid' && order.isPaid);
    });
  }

  const showSummary = (order) => {
    setOrders(order);
    openSummary(order);
  }
  const commands=[];

  return (
    <>
          <VoiceRecognition commands={commands} />
      <div className="filter-container">
        {['all', 'accepted', 'rejected', 'pending', 'paid'].map((status) => (
          <span
            key={status}
            className={`chip ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        ))}
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead className='table-header'>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody className='table-body'>
            {filterOrders(filter).map((row) => (
              <tr key={row._id}>
                <td className="order-id" onClick={() => showSummary(row)}>{row.orderNumber}</td>
                <td>{dateFormat(row.createdAt)}</td>
                <td>{row.buyerName}</td>
                <td>{row.cartItems.length}</td>
                <td>{row.isPaid ? <><AcceptedDot />Paid</> : <><PendingDot />Pending</>}</td>
                <td>{row.isAccepted ?  <><AcceptedDot />Accepted</> : row.isRejected ? <><RejectedDot />Rejected</> : <><PendingDot />Pending</>}</td>
                <td>₹ {row.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderList;
