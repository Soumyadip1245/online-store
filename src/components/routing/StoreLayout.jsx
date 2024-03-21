import React, { useEffect, useState } from 'react'
import { authStore } from '../../utils/firebase'
const StoreLayout = () => {
  const [loggedIn, setLoggedin] = useState(false)
  const [checkStatus, setCheck] = useState(true)
  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsubscribe = authStore.onAuthStateChanged((user) => {
      
      if (user) {
        setLoggedin(true)
        setCheck(false)
        setUser(user)
      }
      else {
        setLoggedin(false)
        setCheck(false)
        setUser(null)
      }
      setCheck(false)
    })
    return () => unsubscribe();
  }, [])
  return { loggedIn, checkStatus, user };
}
export default StoreLayout