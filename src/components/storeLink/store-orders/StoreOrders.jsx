import React, { useEffect, useState } from 'react'
import { useStore } from '../store-context/StoreProvider'
import Order from '../../../models/order'
import { useQuery } from 'react-query'
import Loader from '../../../utils/loader/Loader'
import OrderList from '../../orders/order-list/OrderList'
import OrderSummary from '../../orders/order-summary/OrderSummary'

const StoreOrders = () => {
    const {generatedStore} = useStore()
    const [orders,setOrders] = useState([])
    const [dataOrder,setData] = useState(new Order())
    const [summary,setSummary] = useState(false)
    const fetchOrders = async () =>{
        const data = await Order.getAllOrdersBuyer(generatedStore.buyer._id)
        return data
    }
    const {data,isLoading} = useQuery("buyerOrders",fetchOrders,{enabled: !!generatedStore.buyer})
    useEffect(()=>{
        if(data) setOrders(data)
    },[data])
    const openSummary = (value) =>{
    
        setData(value)
        setSummary(true)
      }
      const summaryBack = () =>{
    
        setSummary(false)
      }
    
    
      const updateOrderStatus = (updatedOrder) => {
        setOrders(prevOrders => prevOrders.map(order => order._id === updatedOrder._id ? updatedOrder : order));
      };
    if(isLoading) return <p>We are fetching your orders</p>

  return (
    <>
      {!isLoading && !summary && <OrderList orders={orders} openSummary={openSummary} isStore={true} themeMode="dark"/>}
      {!isLoading && summary && <OrderSummary order={dataOrder} summaryBack={summaryBack}  updateOrderStatus={updateOrderStatus} isStore={true}/>}
    </>
  )
}

export default StoreOrders