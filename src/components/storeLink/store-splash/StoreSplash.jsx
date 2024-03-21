import React from 'react'
import './StoreSplash.css'
import Logo from '../../assests/background-image.png'
import { InfinitySpin } from 'react-loader-spinner'
const StoreSplash = ({show}) => {
    return (
        <div className='container-image bg-image'>
            <div className='grid-container'>
                <div className="grid-text">
                    <h1 className='h1ag'><span>Online</span> Stores</h1>
                    <h5 className='h5ag'>Powered By Soumyadip Das</h5>
                    <div className='spinner'>
                    {show && <InfinitySpin
                        visible={true}
                        width="200"
                        color="#ffffff"
                        ariaLabel="infinity-spin-loading"
                    />}
                    {show && <p>Loading Store</p>}
                    {!show && <h2 style={{marginTop: '2rem'}}>Store is currently not available</h2>}
                    </div>
                   
                </div>
                <div className="grid-image">
                    <img src={Logo} alt="" />
                </div>
            </div>
        </div>
    )
}

export default StoreSplash