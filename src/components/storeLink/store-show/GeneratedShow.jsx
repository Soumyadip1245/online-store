import React, { useState, useEffect } from 'react';
import { useStore } from '../store-context/StoreProvider';


import StoreView from '../store-view/StoreView';
import StoreSummary from '../store-summary/StoreSummary';
import StoreSplash from '../store-splash/StoreSplash';
import './GeneratedShow.css'
import { logoutUserForstore } from '../../login/Auth';
import StoreOrders from '../store-orders/StoreOrders';
const GeneratedShow = () => {
  const { generatedStore, cart, clearData, setCart } = useStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [openOrders, setOpenorders] = useState(false);
  const [activeItem, setActiveItem] = useState('Store');
  useEffect(() => {

  }, [generatedStore]);

const logout = () =>{
  clearData()
  logoutUserForstore()
}
  return (
    <>
      {generatedStore.isAvailable &&
       <div className="container storelink">
       {/* Sidebar */}
       <div className="sidebar storelink">
         <h2>{generatedStore.store.storeName}</h2>
         <ul>
         <li className={activeItem === 'Store' ? 'active' : ''} onClick={() => { setActiveItem('Store'); setOpen(false);setOpenorders(false) }}>Store</li>
        <li className={activeItem === 'My Cart' ? 'active' : ''} onClick={() => { setActiveItem('My Cart'); setOpen(true); setOpenorders(false)}}>My Cart</li>
        <li className={activeItem === 'My Orders' ? 'active' : ''} onClick={() => { setActiveItem('My Orders'); setOpen(false);setOpenorders(true) }}>My Orders</li>
        <li className={activeItem === 'Logout' ? 'active' : ''} onClick={logout}>Logout</li>
         </ul>
       </div>
       {/* Main Content */}
       <div className="main-content storelink">
         {!open && !openOrders && <StoreView />}
        {open && !openOrders &&<StoreSummary />}
        {openOrders && <StoreOrders/>}
      {/* {openOrders && summary && <OrderSummary order={dataOrder} summaryBack={summaryBack}  updateOrderStatus={updateOrderStatus}/>} */}
       </div>
     </div>
     
      }
      {!generatedStore.isAvailable && <StoreSplash show={false} />}
    </>

  );
};

export default GeneratedShow;
