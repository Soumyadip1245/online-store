import React, { useEffect, useState } from 'react'
import {
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Grid,
    Box,
    Badge,
    CircularProgress,
    AppBar,
    Toolbar,
    IconButton,
  } from "@mui/material";
  import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ProductList from './ProductList';
import Seller from '../../models/seller';
import Store from '../../models/store';
import { useSelector } from 'react-redux';
import { GetUser } from '../login/Auth';
import Product from '../../models/product';
import Loader from '../../utils/loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import VoiceRecognition from "../../utils/voice-recognition/VoiceRecognition"
import { speakMessage } from "../../utils/voice-recognition/Speak"

const ProductDetails = () => {
  const [seller, setSeller] = useState(new Seller());
  const [store, setStore] = useState(new Store());
  const user = useSelector((state) => state.auth.user);
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate()
  const fetchData = async () => {
    const userData = await GetUser(user);
    const storeData = await store.getStoreBySeller(userData._id)
    return await Product.getAllProductsByStore(storeData._id);
  };
  const commands=[];
  const {data,isLoading} = useQuery("products",fetchData,{enabled: !!user})
  useEffect(() => {
    if (data) {
      setProducts(data)
    }
  }, [data]);
  if(isLoading){
    return <Loader/>
  }
  return (
    <>
    <VoiceRecognition commands={commands} />
   <div className="productdetails-container" style={{display: 'flex',flexDirection: 'column', justifyContent: 'center',alignItems: 'center'}}>
   <div className='card-design'>
        {!isLoading &&  < ProductList products={products}  edit={true} /> }
       
        </div >
   </div>
   </>
     



  )
}

export default ProductDetails