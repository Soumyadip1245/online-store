import React, { useEffect, useState } from 'react'
import { useStore } from '../store-context/StoreProvider'
import Order from '../../../models/order'
import { useQuery } from 'react-query'
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
      const handleBackClick = () => {
        window.location.href = '/'; 
      };
    if(isLoading) return <p>We are fetching your orders</p>

  return (
    <>
    <div>
    <button 
          onClick={handleBackClick} 
          style={{
            position: 'absolute', 
            marginLeft:'1rem',
            padding: '0.5rem', 
            fontSize: '1.5rem', 
            cursor: 'pointer', 
            background: '#29292e', 
            border: 'none', 
            color: '#000', 
            display: 'flex',
            alignItems: 'center',
            borderRadius:'10px',
          }}
        >
          <i className="fa-solid fa-arrow-left" style={{ color: '#7c7c7c' }}></i>
        </button>
    <h1 className="summary-heading" style={{textAlign:'center'}}>Orders</h1>
    </div>

    <div style={{padding: '2rem'}}>
      
      {!isLoading && !summary && <OrderList orders={orders} openSummary={openSummary} isStore={true} themeMode="dark"/>}
      {!isLoading && summary && <OrderSummary order={dataOrder} summaryBack={summaryBack}  updateOrderStatus={updateOrderStatus} isStore={true}/>}
    </div>
    </>
   
  )
}

export default StoreOrders