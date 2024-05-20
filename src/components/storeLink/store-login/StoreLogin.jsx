import React, { useEffect, useState } from 'react'
import { googleLoginForstore } from '../../login/Auth'
import './StoreLogin.css'
import Product from '../../../models/product'
import Logo from '../../assests/background-image.png'
import GoogleButton from 'react-google-button'
import { LightBar } from '../../design/LightBar'
import Header from '../../Header'
import Footer from '../../opportunityjobs/headerfooter/Footerjob'
import Store from '../../../models/store'
import Display from './displayproducts/Display'
import Loader from '../../../utils/loader/Loader'
const StoreLogin = () => {
  const [products, setProducts] = useState([])

  const google = async () => {
    googleLoginForstore()
  }
  useEffect(() => {
    const fetchStore = async () => {
      const host = window.location.host.split(".")[0]
      const data = await Store.getStoreByunique(host)
      setProducts(data.products)
    }

    fetchStore()
  }, [])
  return (
    <div className="subdomain-container">
      <Header hideHeaderRight={true} />
      <LightBar />
      <h1 className="subdomain-heading">Digital Drift gives your business boost🚀</h1>
      <div className="subdomain-searchbar">
        <input
          type="text"
          className="input-field-loginfield"
          placeholder="What you want to purchase today?"
        />
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
      <p className='display-login'>Login to purchase items. <a onClick={google}>Google Login</a></p>
      <div className="subdomain-products">
      {products.length == 0 ? <div className="backend-containeri">
        <div className="backend-loader"></div>
        <div className="backend-loader delay1"></div>
        <div className="backend-loader delay2"></div>
        <div className="backend-loader delay4"></div>
      </div> : <Display products={products} />}
      </div>
     <Footer/>
    </div>
  )
}

export default StoreLogin