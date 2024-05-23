import React, { useEffect } from 'react'
import { useStore } from '../../store-context/StoreProvider';
import { CartItem } from '../../store-context/storeService';

const Display = ({ products,value }) => {
    const { cart, setCart } = useStore();
    const handleAddToCart = (product) => {
        console.log(product)
        if (cart.some(obj => obj.id == product._id)) {
          const n = cart.filter((item) => item.id !== product._id)
          setCart(n);
          return
        }
        const c = new CartItem()
        c.id = product._id
        c.productCategory = product.productCategory
        c.productImage = product.productImage
        c.productName = product.productName
        c.productPrice = product.productPrice
        setCart([...cart, c])
      };
    return (
        <>
            <div className="display-grid">
                {
                    products.map((curr) => (
                        <div className="show-card display-theme">
                            <div className="show-flex">
                                <div className="show-price">
                                    <div>
                                        <p className='showname displayname'>{curr.productName.length > 20 ? curr.productName.slice(0, 15) + "...." : curr.productName}</p>
                                        <p className='showcategory'>{curr.productCategory}</p>
                                    </div>
                                    <p className='showprice'>₹{curr.productPrice}</p>
                                </div>
                                <div className="show-image">
                                    <div className="showimage">
                                        <img src={curr.productImage} alt="" />
                                    </div>
                                    {value && <button className='storelinkcoloredbutton' onClick={()=>handleAddToCart(curr)}>{cart.some(obj => obj.id == curr._id) ? "Added" : "Add"}</button>}

                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>
        </>

    )
}

export default Display