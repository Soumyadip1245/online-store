import React from 'react'
import Display from '../displayproducts/Display'

const StoreContent = ({products,value,query,setQuery,google,show}) => {
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
      {!show && !value && <p className='display-login'>Login to purchase items. <a onClick={google}>Google Login</a></p>}
      {!show && <div className="subdomain-products">
        {products.length == 0 ? <div className="backend-containeri">
          <div className="backend-loader"></div>
          <div className="backend-loader delay1"></div>
          <div className="backend-loader delay2"></div>
          <div className="backend-loader delay4"></div>
        </div> : <Display products={products} value={value} />}
      </div>}
   </>
  )
}

export default StoreContent