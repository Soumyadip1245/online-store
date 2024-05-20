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
import { useSelector } from 'react-redux'
import { useStore } from '../store-context/StoreProvider'
import { StoreInfo } from '../store-context/storeService'
const StoreLogin = ({ value }) => {
  const [products, setProducts] = useState([])
  const [store, setStore] = useState(new StoreInfo())
  const [query, setQuery] = useState("")
  const { generatedStore, setGeneratedStore } = useStore()
  const user = useSelector((state) => state.store.user)
  const google = async () => {
    googleLoginForstore()
  }
  const searchQuery = products.filter(product => product.productName.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    const data = async () => {
      if (value) {
        const data = await store.setData(user, host)
        setGeneratedStore(data)
      }
    }
    data()
  }, [value])
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
      {!value && <p className='display-login'>Login to purchase items. <a onClick={google}>Google Login</a></p>}
      <div className="subdomain-products">
        {products.length == 0 ? <div className="backend-containeri">
          <div className="backend-loader"></div>
          <div className="backend-loader delay1"></div>
          <div className="backend-loader delay2"></div>
          <div className="backend-loader delay4"></div>
        </div> : <Display products={searchQuery} value={value} />}
      </div>
      <Footer hideHeaderRight={true}/>
    </div>
  )
}

export default StoreLogin