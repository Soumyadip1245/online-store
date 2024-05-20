import React, { useEffect } from 'react'

const Display = ({ products }) => {
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