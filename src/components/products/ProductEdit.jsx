import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Seller from '../../models/seller';
import Store from '../../models/store';
import { GetUser } from '../login/Auth';
import Product from '../../models/product';
import axios from 'axios';
import Loader from '../../utils/loader/Loader';
import VoiceRecognition from '../../utils/voice-recognition/VoiceRecognition';
import {  useSpeak } from '../../utils/voice-recognition/SpeakContext.jsx';
import { notifySuccess, notifyError } from '../../utils/notification/Notification';
import { productCommands } from '../commands/productCommands';
import useLocalData from '../../utils/localSetting';

const ProductEdit = ({ stepper, productSuccess }) => {
  const [seller, setSeller] = useState(new Seller());
  const [store, setStore] = useState(new Store());
  const [product, setProduct] = useState(new Product());
  const [original, setOriginal] = useState(new Product());
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { activateVoice } = useLocalData()
  const {speakMessage} = useSpeak()

  useEffect(() => {
    if (user != null) {
      const fetchData = async () => {
        const userData = await GetUser(user);
        const storedata = await store.getStoreBySeller(userData._id);
        setStore(storedata);
        setSeller(userData);
        if (id) {
          const productData = await Product.getById(id);
          setOriginal(productData);
          setProduct(productData);
          setLoader(false);
          return;
        } else {
          setLoader(false);
        }
      };
      fetchData();
    }
  }, [user]);

  const handleSubmit = async () => {
    if (id) {
      original.productName = product.productName;
      original.productCategory = product.productCategory;
      original.productPrice = product.productPrice;
      await original.updateProduct();
      notifySuccess("Details updated");
      navigate('/product-details');
      return;
    }

    original.productName = product.productName;
    original.productPrice = Number(product.productPrice);
    original.productCategory = product.productCategory;
    original.isAdded = true;
    original.storeId = store._id;
    original.sellerId = seller._id;

    try {
      await original.create();
      notifySuccess("Details Created");
      stepper ? productSuccess() : navigate("/product-details");
    } catch (error) {
      notifyError("Not able to create product");
    }
  };

  const imageLink = async (link) => {
    const response = await axios.get(link, { responseType: 'blob' });
    const blob = response.data;
    const file = new File([blob], { type: 'image/jpeg' });

    try {
      setLoading(true);
      const data = await original.uploadBlob(file);
      original.productImage = data;
      setUploadSuccess(true);
      notifySuccess("Image uploaded");
    } catch (error) {
      console.error("Error uploading image:", error);
      notifyError("Not able upload image");
    } finally {
      setLoading(false);
    }
  };

  const imageHandler = async (event) => {
    try {
      setLoading(true)
      const data = await original.uploadImage(event.target.files[0]);
      const imgLink = await original.downloadUrl(data)
      original.productImage = imgLink;
      setUploadSuccess(true)
      notifySuccess("Image uploaded");
    } catch (error) {
      console.error("Error uploading image:", error);
      notifyError("Not able to upload image");
    } finally {
      setLoading(false);
    }
  };

  const back = () => {
    navigate('/product-details');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
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

  const commands = productCommands(updateFormData, handleSubmit);

  return (
    <>
      {loader && <Loader />}
      {!loader && (
        <>
          {activateVoice && <VoiceRecognition commands={commands} />}
          <form>
            <div className="storedetails-container">
              <div className='card-design'>
                <p className='store-name'>Product Details</p>
                <div className='input-text'>
                  <input
                    type="text"
                    placeholder='enter your product name'
                    className='input-field'
                    value={product.productName}
                    onChange={handleChange}
                    name="productName"
                  />
                  <p className="written text-wrap">The product name will be prominently displayed for all visitors to see.</p>
                </div>
                <div className='input-text'>
                  <input
                    type="number"
                    placeholder='enter your product price'
                    className='input-field'
                    value={product.productPrice}
                    onChange={handleChange}
                    name="productPrice"
                  />
                  <p className="written text-wrap">The product price will be clearly displayed for all visitors to view.</p>
                </div>
                <div className='input-text'>
                  <input
                    type="text"
                    placeholder='enter your category'
                    className='input-field'
                    value={product.productCategory}
                    onChange={handleChange}
                    name="productCategory"
                  />
                  <p className="written text-wrap">Select the appropriate category for your product.</p>
                </div>
                <div className='input-text'>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      name="fileInput"
                      onChange={imageHandler}
                      type="file"
                      accept="image/*"
                      className='imagedrop'
                    />
                    {loading && <i class="fa-regular fa-circle" style={{ color: 'blue', marginLeft: '5px' }}></i>}
                    {uploadSuccess && <i class="fa-regular fa-circle-check" style={{ color: 'green', marginLeft: '5px' }}></i>}
                  </div>
                  <p className="written text-wrap">Choose image for your product.</p>
                </div>
              </div>
              <div>
                <button type="button" className='btn-design' onClick={handleSubmit}>Save</button>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default ProductEdit;
