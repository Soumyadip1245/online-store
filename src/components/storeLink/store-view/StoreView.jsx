import React, { useEffect, useState } from 'react'

import './StoreView.css'
import { Box, Card, Typography } from '@mui/material';
import QRCode from 'qrcode.react';
import ProductGrid from '../store-product/ProductGrid';
import { GeneratedStore } from '../store-context/storeService';
import { useStore } from '../store-context/StoreProvider';
const StoreView = () => {
  const { generatedStore } = useStore();
  const [generated, setGenerated] = useState(new GeneratedStore())
  const contactInfo = `Mobile Number : ${generated.seller.mobile.number || 'NOT PROVIDED'}\nEmail ID : ${generated.seller.profile.email.value || 'NOT PROVIDED'}`;
  useEffect(() => {
    setGenerated(generatedStore)
  }, [generatedStore])

  return (
      <ProductGrid products={generated.products} />
  )
}

export default StoreView