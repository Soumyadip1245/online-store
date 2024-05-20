import React, { useEffect, useState } from "react"
import StoreSplash from "./store-splash/StoreSplash"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { StoreInfo } from "./store-context/storeService"
import GeneratedShow from "./store-show/GeneratedShow"
import { useStore } from "./store-context/StoreProvider"
import Product from "../../models/product"
const StoreLink = () => {
  const [store, setStore] = useState(new StoreInfo())
  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.store.user)
  const info = useSelector((state) => state.store.info)
  const [domain,setDomain] = useState("")
  const { generatedStore, setGeneratedStore } = useStore()
  useEffect(() => {
    if (user != null) {
      const fetchData = async () => {
        const host = window.location.host.split(".")[0]
        const data = await store.setData(user, host)
        setGeneratedStore(data)
      }
      fetchData()
    }
  }, [user])
  return <>{generatedStore ? <GeneratedShow /> : <StoreSplash show={true} />}</>
}

export default StoreLink
