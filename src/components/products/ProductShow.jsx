import React, { useEffect, useState } from 'react'
import Product from '../../models/product'
import { useNavigate } from 'react-router-dom'
import './ProductShow.css'
import { notifySuccess, notifyError } from '../../utils/notification/Notification';
const ProductShow = ({ product: initialProduct, onAddToCart, onCheckbox, showChecked, edit, seller, store,index,enableIndex }) => {
  const [product, setProduct] = useState(new Product())
  const [isChecked, setChecked] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    setProduct(initialProduct)
    setChecked(initialProduct.isAdded);
  }, [initialProduct])
  const handleCheckbox = () => {
    setChecked(!isChecked);
    onCheckbox(product._id, !isChecked);
    notifySuccess("Setting applied")
  };
  const editOpen = (product) => {
    navigate('/product-edit/' + product)
  }

  return (

    <div className="show-card card-margin">
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
        <img src={product.productImage} alt="" />
        </div>
        {!edit && <button className="btn-design" onClick={handleCheckbox}>{isChecked ? "Added" : "Add"}</button>}
       {edit && <button className="btn-design" onClick={()=>editOpen(product._id)}>Edit</button>}
      </div>
    </div>
    </div>
  )
}

export default ProductShow