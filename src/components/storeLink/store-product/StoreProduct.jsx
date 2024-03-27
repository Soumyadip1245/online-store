import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import Found from '../../assests/found.jpg'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useStore } from '../store-context/StoreProvider';
import { Verified } from '@mui/icons-material';
import ShoppingBasket from '@mui/icons-material/ShoppingBasket';
import { CartItem } from '../store-context/storeService';
const StoreProduct = ({ product }) => {
  const [isSelected, setSelected] = useState(false);
  const { cart, setCart } = useStore();


  const handleAddToCart = () => {
    if (cart.some(obj => obj.id == product._id)) {
      const n = cart.filter((item) => item.id !== product._id)
      setCart(n);
      setSelected(false)
      return
    }
    const c = new CartItem()
    c.id = product._id
    c.productCategory = product.productCategory
    c.productImage = product.imageUrl
    c.productName = product.productName
    c.productPrice = product.productPrice
    setSelected(true)
    setCart([...cart, c])
  };

  return (
    <div className="show-card storelink-theme">
    <div className="show-flex">
      <div className="show-price">
        <div>
        <p className='showname'>{product.productName}</p>
        <p className='showcategory'>{product.productCategory}</p>
        </div>
        <p className='showprice'>₹{product.productPrice}</p>
      </div>
      <div className="show-image">
        <div className="showimage">
        <img src={product.imageUrl} alt="" />
        </div>
        <button className='storelinkcoloredbutton' onClick={handleAddToCart}>{cart.some(obj => obj.id == product._id) ? "Added" : "Add"}</button>
     
      </div>
    </div>

    </div>

  );
};

export default StoreProduct;
