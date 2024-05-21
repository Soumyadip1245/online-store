import React, { useEffect, useState } from 'react'
import { googleLoginForstore } from '../../login/Auth'
import './StoreLogin.css'
import { LightBar } from '../../design/LightBar'
import Header from './header/Header'
import Footer from '../../opportunityjobs/headerfooter/Footerjob'
import Store from '../../../models/store'
import { useSelector } from 'react-redux'
import { useStore } from '../store-context/StoreProvider'
import { StoreInfo } from '../store-context/storeService'
import StoreContent from './content/StoreContent'
import StoreOrders from '../store-orders/StoreOrders'
import StoreSummary from '../store-summary/StoreSummary'
const StoreLogin = ({ value }) => {
  const [products, setProducts] = useState([])
  const [store, setStore] = useState(new StoreInfo())
  const [query, setQuery] = useState("")
  const [show, setShow] = useState("store")
  const { generatedStore, setGeneratedStore } = useStore()
  const user = useSelector((state) => state.store.user)
  const google = async () => {
    googleLoginForstore()
  }
  const searchQuery = products.filter(product => product.productName.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    const data = async () => {
      if (value) {
        console.log(user)
        const host = window.location.host.split(".")[0]
        const data = await store.setData(user, host)
        console.log(data)
        setGeneratedStore(data)
      }
    }
    data()
  }, [value,user])
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
      <Header hideHeaderRight={!value} setShow={setShow} />
      <LightBar />
      <h1 className="subdomain-heading">Digital Drift gives your business boost🚀</h1>
      {show == 'store' && <StoreContent
        products={searchQuery}
        value={value}
        query={query}
        setQuery={setQuery}
        google={google} />}
      {show == 'orders' && <StoreOrders />}
      {show == 'cart' && <StoreSummary />}
      <Footer hideHeaderRight={true} />
    </div>
  )
}

export default StoreLogin