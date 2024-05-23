import React from 'react'
import Display from '../displayproducts/Display'
import StoreClosed from '../../store-closed/StoreClosed'

const StoreContent = ({products,value,query,setQuery,google,hide,info}) => {
  return (
   <>
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
      {!hide && !value && <p className='display-login'>Login to purchase items. <a onClick={google}>Google Login</a></p>}
      {!hide && <div className="subdomain-products">
        {products.length ==  0 ? <div className="backend-containeri">
          <div className="backend-loader"></div>
          <div className="backend-loader delay1"></div>
          <div className="backend-loader delay2"></div>
          <div className="backend-loader delay4"></div>
        </div> : info.isEnabled ? <Display products={products} value={value} />: <StoreClosed/>}
      </div>}
   </>
  )
}

export default StoreContent