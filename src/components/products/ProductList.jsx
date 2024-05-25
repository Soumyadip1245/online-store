import React from "react";
import ProductShow from "./ProductShow";

import { useNavigate } from "react-router-dom";
import VoiceRecognition from "../../utils/voice-recognition/VoiceRecognition";
import {  useSpeak } from "../../utils/voice-recognition/SpeakContext.jsx";

const ProductList = ({ products, showChecked, onCheckbox, edit, voice, seller, store,enableIndex }) => {
  const navigate = useNavigate();
  const {speakMessage} = useSpeak()

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
      <div mt={2}>
        {!showChecked && <p  style={{color: 'white'}} >
          <a
            onClick={onAddNewProductClick}
            style={{ color: "var(--color-text)", fontWeight:'bold' }}
          >
            Click
          </a>{" "}
          
          here to add new products
        </p>}
          {products.map((curr, key) => {
            return (
              <div className=".compare-container">
                <ProductShow index={key} product={curr} edit={edit} key={key} seller={seller} store={store} onCheckbox={onCheckbox} showChecked={showChecked} enableIndex = {enableIndex} />
              </div>
            );
          })}


      </div>
    </>
  );
};

export default ProductList;
