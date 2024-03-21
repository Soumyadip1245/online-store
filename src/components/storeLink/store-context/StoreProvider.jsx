import React, { createContext, useContext, useState } from 'react'
const StoreContext = createContext();
const StoreProvider = ({children}) => {
  const [generatedStore, setGeneratedStore] = useState(null);
  const [cart, setCart] = useState([]);
  const clearData = () =>{
    setGeneratedStore(null);
    setCart([]);
  }
  return (
    <StoreContext.Provider value={{ generatedStore, setGeneratedStore, cart, setCart, clearData }}>
    {children}
  </StoreContext.Provider>
  )
}
export const useStore = () => {
  return useContext(StoreContext);
};
export default StoreProvider