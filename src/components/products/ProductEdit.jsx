import { AppBar, Box, Button, CircularProgress, Grid, IconButton, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useSelector } from 'react-redux'
import Seller from '../../models/seller'
import Store from '../../models/store'
import { GetUser } from '../login/Auth'
import Product from '../../models/product'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { green } from '@mui/material/colors'
import axios from 'axios'
import Loader from '../../utils/loader/Loader'
import VoiceRecognition from '../../utils/voice-recognition/VoiceRecognition'
import { speakMessage } from '../../utils/voice-recognition/Speak'
import { message } from 'antd'
import Scrapper from '../../utils/scrapper/Scrapper'
const ProductEdit = ({ stepper, productSuccess }) => {
  const [seller, setSeller] = useState(new Seller());
  const [store, setStore] = useState(new Store());
  const [product, setProduct] = useState(new Product());
  const [original, setOriginal] = useState(new Product());
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (user != null) {
      const fetchData = async () => {
        const userData = await GetUser(user);
        const storedata = await store.getStoreBySeller(userData._id)
        setStore(storedata)
        setSeller(userData);
        if (id) {
          const productData = await Product.getById(id)
          setOriginal(productData)
          setProduct(productData)
          setLoader(false)
          return
        }
        else {
          setLoader(false);
        }
      };
      fetchData();
    }
  }, [user]);
  const handleSubmit = async () => {
    // if (!original.productImage) return;
    if (id) {
      original.productName = product.productName
      original.productCategory = product.productCategory
      original.productPrice = product.productPrice
      await original.updateProduct()
      message.success("Details updated")
      navigate('/product-details')
      return
    }

    original.productName = product.productName
    original.productPrice = Number(product.productPrice);
    original.productCategory = product.productCategory
    original.isAdded = true
    original.storeId = store._id
    original.sellerId = seller._id

    await original.create();
    message.success("Details Created")
    stepper ? productSuccess() : navigate("/product-details")
  };
  const imageLink = async (link) => {
    const response = await axios.get(link, { responseType: 'blob' });
    const blob = response.data;

    console.log(blob)
    try {
      setLoading(true);
      const data = await original.uploadImage(blob);
      original.productImage = data;
      setUploadSuccess(true);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };
  const imageHandler = async (event) => {

    try {
      setLoading(true);
      const data = await original.uploadImage(event.target.files[0]);
      original.productImage = data;
      setUploadSuccess(true);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };
  const back = () => {
    navigate('/product-details')
  }
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const updateFormData = (fieldName, value) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [fieldName]: value,
    }));
  };
  const commands = [
    {
      command: "set product name to *",
      callback: (productName) => {
        speakMessage(`Setting product name to ${productName}`);
        updateFormData("productName", productName);
      },
    },
    {
      command: "set product price to *",
      callback: (productPrice) => {
        speakMessage(`Setting product price to ${productPrice}`);
        updateFormData("productPrice", productPrice);
      },
    },
    {
      command: "set product category to *",
      callback: (productCategory) => {
        speakMessage(`Setting product category to ${productCategory}`);
        updateFormData("productCategory", productCategory);
      },
    },
    {
      command: "save product",
      callback: () => {
        handleSubmit();
      },
    },
  ];
  const sendProduct = async (item) => {
    console.log(item, Number(item.price))
    product.productName = item.name
    product.productCategory = ""
    product.productPrice = Number(item.price.replace(/,/g, ''));
    await imageLink(item.image)
  }
  return (
    <>
      <VoiceRecognition commands={commands} />

      {loader && <Loader />}
      {!loader && <form >
        <Box m={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Product Details</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Product Name"
                name="productName"
                value={product.productName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="number"
                label="Product Price"
                name="productPrice"
                value={product.productPrice}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Category"
                name="productCategory"
                value={product.productCategory}
                onChange={handleChange}
              />
            </Grid>



            {
              <Grid item xs={12} sm={6}>
                <input
                  name="fileInput"
                  onChange={imageHandler}
                  type="file"
                  accept="image/*"
                />
                {loading && (
                  <CircularProgress size={20} style={{ marginLeft: "8px" }} />
                )}
                {uploadSuccess && (
                  <CheckCircleIcon
                    style={{ color: green[500], marginLeft: "8px" }}
                  />
                )}
              </Grid>
            }
            <Grid item xs={12}>
              <Button type="button" onClick={handleSubmit} variant="contained" color="primary">
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>}
      <Box m={2}>
        <Scrapper sendProduct={sendProduct} />
      </Box>
    </>
  )
}

export default ProductEdit