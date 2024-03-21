import { KeyboardBackspace } from '@mui/icons-material'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OrderList from '../order-list/OrderList'
import Seller from '../../../models/seller'
import Order from '../../../models/order'
import { useSelector } from 'react-redux'
import { GetUser } from '../../login/Auth'
import OrderSummary from '../order-summary/OrderSummary'
import { useQuery } from 'react-query'
import Loader from '../../../utils/loader/Loader'

const OrderComponent = () => {
  // const [seller, setSeller] = useState(new Seller());
  const [order,setOrder] = useState([])
  const [dataOrder,setData] = useState(new Order())
  const [summary,setSummary] = useState(false)
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
   
  }, []);
  const fetchOrders= async()=>{
    const userData = await GetUser(user);
    return await Order.getAllOrdersSeller(userData._id)
   
  }

  const {data,isLoading} = useQuery("orders",fetchOrders,{enabled: !!user})
 
  useEffect(()=>{

    if(data) setOrder(data)
   
  },[data])
  const openSummary = (value) =>{
    
    setData(value)
    setSummary(true)
  }
  const summaryBack = () =>{

    setSummary(false)
  }


  const updateOrderStatus = (updatedOrder) => {
    setOrder(prevOrders => prevOrders.map(order => order._id === updatedOrder._id ? updatedOrder : order));
  };
  if(isLoading){
    return <Loader/>
  }
  return (
    <>
   
      <Box m={2}>
      {!summary && <OrderList orders={order} openSummary={openSummary} isStore={false}/>}
      {summary && <OrderSummary order={dataOrder} summaryBack={summaryBack}  updateOrderStatus={updateOrderStatus}/>}
      </Box>
    </>
  )
}

export default OrderComponent