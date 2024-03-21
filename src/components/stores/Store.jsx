import React, { useEffect, useState } from "react";
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
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Seller from "../../models/seller";
import Store from "../../models/store";
import { useSelector } from "react-redux";
import { GetUser } from "../login/Auth";
import StoreDetails from "./StoreDetails";
import StoreShow from "./StoreShow";
import Loader from "../../utils/loader/Loader";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
const StoreDefault = () => {
  const [seller, setSeller] = useState(new Seller());
  const [edit, setEdit] = useState(false)
  const [store, setStore] = useState(new Store());
  const [submitSuccess, setSuccess] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const { data: userData, isLoading: isUserLoading } = useQuery('user', async () => {
    if (user) {
      return await GetUser(user);
    }
  },{ enabled: !!user });

  const { data: storeData, isLoading: isStoreLoading } = useQuery('store', async () => {
    if (userData?._id) {
      const store = new Store();
      store.sellerId = userData._id;
      return await store.getStoreBySeller(userData._id);
    }
  },{enabled: !!userData});
  useEffect(() => {
    if (userData && storeData) {
      setSeller(userData);
      setStore(storeData);
    }
  }, [userData, storeData]);

  if (isUserLoading || isStoreLoading) {
    return <Loader/>;
  }

  const handleStoreDetailsSubmitSuccess = () => {
    setSuccess(true)
  }
  const editClick = () => {
    setEdit(true)
  }
 
  return (
    <>
      {(!isStoreLoading && edit && (!submitSuccess )) && <StoreDetails edit={edit} store={store} onSubmitSuccess={handleStoreDetailsSubmitSuccess} editGetting={() => setEdit(false)} />}
      {(!isStoreLoading && !edit && ((submitSuccess || store.storeName))) && <StoreShow editClick={editClick} store={store} seller={seller} storeSeller={store}/>}
    </>
  );
};

export default StoreDefault;
