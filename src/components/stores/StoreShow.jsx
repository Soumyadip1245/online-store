import React, { useEffect, useState } from "react";
import {
  Badge,
  Switch,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Store from "../../models/store";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import "./StoreShow.css";
import Product from "../../models/product";
import ProductList from "../products/ProductList";
import Loader from "../../utils/loader/Loader";
import { Edit } from "@mui/icons-material";
import VoiceRecognition from "../../utils/voice-recognition/VoiceRecognition";
import { speakMessage } from "../../utils/voice-recognition/Speak";
import { useQuery } from "react-query";
import { Alert, message } from "antd";
import Seller from "../../models/seller";

const StoreShow = ({ store, editClick,seller:initialSeller,storeSeller }) => {  
  const fetchStoreAndProducts = async () => {
  const products = await Product.getAllProductsByStore(store._id);
  return products;
};
  const { data, isLoading } = useQuery("products",fetchStoreAndProducts);
  const [toggleState, setToggleState] = useState(store.isEnabled);
  // const [store, setStore] = useState(new Store());
  const [products, setProducts] = useState([]);
  const [enable, setEnable] = useState(false);
  const [edit, setEdit] = useState(false)
  const [seller,setSeller] = useState(new Seller())
  useEffect(()=>{
    setSeller(Seller.toCls(seller))
  },[initialSeller])
  useEffect(() => {
    if(data){
      setProducts(data)
    }
  }, [data]);

  const handleToggleChange = async () => {
    setToggleState(!toggleState);
    store.isEnabled = !toggleState

    
    await store.updateEnabled()
  };
  const handleCopyClick = () => {
    const el = document.createElement("textarea");
    el.value = store.storeUrl;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    message.success("Link Copied")
  };
  const onCheckbox = async (id, value) => {
    const product = new Product()
    product._id = id
    product.isAdded = value
    await product.updateAdded()
  };
  const onEdit = () => {
    editClick()
  }
  const commands = [
    {
      command: "enable indexing",
      callback: () => {
        setEnable(true)
      },
    },
    {
      command: "edit store",
      callback: () => {
        onEdit()
      },
    },
    {
      command: "toggle store",
      callback: () => {
        speakMessage(`Store ${!toggleState ? "Enabled" : "Disabled"}`)
        handleToggleChange()
      },
    },
    {
      command: "toggle store",
      callback: () => {
        speakMessage(`Store ${!toggleState ? "Enabled" : "Disabled"}`)
        handleToggleChange()
      },
    },
    {
      command: "add product with indexing *",
      callback: (name) => {
        console.log(name)
        const number = Number(name)
        console.log(products)
        const details = products[number - 1]
        console.log(details)
        if (!details) {
          speakMessage("Product not there in the list")
          return
        }
        const updatedProducts = products.map((p) =>
          p._id === details._id ? { ...p, isAdded: true } : p
        );
        setProducts(updatedProducts)
        speakMessage(`${name} added to the store`)

        onCheckbox(details._id, true)
      },
    },
    {
      command: "remove products with indexing *",
      callback: (name) => {
        const number = Number(name)
        const details = products[number - 1]

        if (!details) {
          speakMessage("Product not there in the list")
          return
        }
        const updatedProducts = products.map((curr) =>
          curr._id == details._id ? { ...curr, isAdded: false } : curr
        )
        setProducts(updatedProducts)
        speakMessage(`${name} removed from the store`)
        onCheckbox(details._id, false)
      },
    },

  ];
  return (
    <>

      <VoiceRecognition commands={commands} />
      <Box m={2}>
        <Card style={{ border: "1px solid lightgrey" }}>
          <CardContent>
            {seller.istheSubscriptionAvailable && <Alert message="Subscription Ended. Renew Subscription" type="info" showIcon />}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <div className="badge">
                <p>{store.isVerified ? "Verified" : "Not Verified"}</p>
              </div>
              <div sx={{ display: 'flex' }}>
                <IconButton onClick={onEdit}><Edit /></IconButton>
                {!seller.istheSubscriptionAvailable && store.isVerified && <Switch checked={toggleState} onChange={handleToggleChange} />}
              </div>
            </Box>
            
          </CardContent>
          <Divider />
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <img
                src={store.imageUrl}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <Box display="flex" flexDirection="column">
                <Typography variant="body1" fontWeight="bold">
                  {store.storeName}
                </Typography>
                <Typography variant="body2" fontWeight="normal">
                  GST: {store.gstNumber}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box m={2}>
        <Card style={{ border: "1px solid lightgrey" }}>
          <CardContent>
            <Typography variant="body1" fontWeight="bold">
              Store Link
            </Typography>
          </CardContent>
          <Divider />
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${store.storeUrl}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Box>
          </CardContent>
          <Divider />
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="body2"
                style={{
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {store.storeUrl}
              </Typography>
              <IconButton color="inherit" onClick={handleCopyClick}>
                <FileCopyOutlinedIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box m={2}>
        <Card style={{ border: "1px solid lightgrey" }}>
          <CardContent>
            <Typography variant="body1" fontWeight="bold">
              Products
            </Typography>
          </CardContent>
          <Divider />
          <CardContent sx={{ padding: 0 }}>
            {isLoading && <Loader />}
            {!isLoading && <ProductList voice={true} showChecked={true} products={products} onCheckbox={onCheckbox} enableIndex={enable}/>}
          </CardContent>

        </Card>
      </Box>
    </>
  );
};

export default StoreShow;
