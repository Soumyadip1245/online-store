import React, { useEffect, useState } from 'react'
import { useStore } from '../storeLink/store-context/StoreProvider';
import { GeneratedStore } from '../storeLink/store-context/storeService';
import './StoreView.css'
import { Box, Card, Typography } from '@mui/material';
import QRCode from 'qrcode.react';
import ProductGrid from './store-product/ProductGrid';
const StoreView = () => {
  const { generatedStore } = useStore();
  const [generated, setGenerated] = useState(new GeneratedStore())
  const contactInfo = `Mobile Number : ${generated.seller.mobile.number || 'NOT PROVIDED'}\nEmail ID : ${generated.seller.profile.email.value || 'NOT PROVIDED'}`;
  useEffect(() => {
    setGenerated(generatedStore)
  }, [generatedStore])

  return (
    <Box m='2rem'>
   <ProductGrid products={generated.products}/>
  </Box>
  )
}

export default StoreView