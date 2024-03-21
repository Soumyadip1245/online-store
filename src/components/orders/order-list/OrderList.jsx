import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Box, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses, useTheme } from '@mui/material';
import date from 'date-and-time';
import OrderSummary from '../order-summary/OrderSummary';

const OrderList = ({ orders, openSummary, themeMode }) => {
  const [filter, setFilter] = useState('all');
  const [orderSummary, setOrders] = useState(null);
  const theme = useTheme(); // Use useTheme hook to access theme

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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#f0f0f0', // Updated to a light gray
      color: theme.palette.common.black,
      fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color: theme.palette.common.black,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const dateFormat = (createdAt) => {
    const now = new Date(createdAt);
    return date.format(now, 'ddd, MMM DD YYYY');
  }

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

  return (
    <>
      <Box mb={2}>
        {['all', 'accepted', 'rejected', 'pending', 'paid'].map((status) => (
          <Chip
            key={status}
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            color={filter === status ? 'primary' : 'default'}
            onClick={() => setFilter(status)}
            clickable
            variant={filter === status ? 'filled' : 'outlined'}
            style={{
              borderRadius: '20px',
              marginRight: '5px',
              // Conditional background color based on themeMode and filter status
              backgroundColor: filter === status ? (themeMode === 'dark' ? '#f02e65' : '#1677ff') : '#e0e0e0',
              color: filter === status ? '#fff' : '#000',
              border: filter === status ? 'none' : '1px solid #bdbdbd',
            }}
          />
        ))}
      </Box>

      <TableContainer component={Paper} style={{ backgroundColor: '#fff' }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order ID</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Customer</StyledTableCell>
              <StyledTableCell align="left">Items</StyledTableCell>
              <StyledTableCell align="left">Payment</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterOrders(filter).map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  <OrderLink onClick={() => showSummary(row)}>
                    {row.orderNumber}
                  </OrderLink>
                </StyledTableCell>
                <StyledTableCell align="left">{dateFormat(row.createdAt)}</StyledTableCell>
                <StyledTableCell align="left">{row.buyerName}</StyledTableCell>
                <StyledTableCell align="left">{row.cartItems.length}</StyledTableCell>
                <StyledTableCell align="left">{row.isPaid ? <><AcceptedDot />Paid</> : <><PendingDot />Pending</>}</StyledTableCell>
                <StyledTableCell align="left">{row.isAccepted ? <><AcceptedDot />Accepted</> : row.isRejected ? <><RejectedDot />Rejected</> : <><PendingDot />Pending</>}</StyledTableCell>
                <StyledTableCell align="left">₹ {row.totalAmount}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderList;
