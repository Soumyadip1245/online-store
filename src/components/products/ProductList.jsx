import React, { useEffect, useState } from "react";
import ProductShow from "./ProductShow";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VoiceRecognition from "../../utils/voice-recognition/VoiceRecognition";
import { speakMessage } from "../../utils/voice-recognition/Speak";

const ProductList = ({ products, showChecked, onCheckbox, edit, voice, seller, store,enableIndex }) => {
  const navigate = useNavigate();
  const onAddNewProductClick = () => {
    navigate("/product-edit");
  };
  const commands = [
    {
      command: "add product",
      callback: () => {
        onAddNewProductClick()
      },
    },
    {
      command: "edit *",
      callback: (productName) => {
        const product = products.find((curr) => curr.productName.toLowerCase() == productName.toLowerCase())
        if (!product) {
          speakMessage("Product not in the list")
          return
        }
        navigate('/product-edit/' + product._id)
      },
    },

  ];
  return (
    <>
      {!voice && <VoiceRecognition commands={commands} />}
      <Box m={2}>
        {!showChecked && <Typography mb={2} variant="body1" >
          <a
            onClick={onAddNewProductClick}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Click
          </a>{" "}
          here to add new products
        </Typography>}
        <Grid container spacing={2}>
          {products.map((curr, key) => {
            return (
              <Grid item xs={6}>
                <ProductShow index={key} product={curr} edit={edit} key={key} seller={seller} store={store} onCheckbox={onCheckbox} showChecked={showChecked} enableIndex = {enableIndex} />
              </Grid>
            );
          })}

        </Grid>

      </Box>
    </>
  );
};

export default ProductList;
