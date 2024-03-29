import React, { useEffect, useState } from 'react';
import './AppInfo.css'; // Import CSS file
import { useSelector } from 'react-redux';
import { GetUser } from '../login/Auth';
import { useQuery } from 'react-query';
import Seller from '../../models/seller';

const AppInfo = () => {
    const [seller,setSeller] = useState(new Seller())
    const user = useSelector((state) => state.auth.user);
    const fetchData = async () => {
      return await GetUser(user);
    };
    const {data,isLoading} = useQuery("info",fetchData,{enabled: !!user})
  
    useEffect(()=>{
      if(data) setSeller(data)
    },[data])
    return (
        <>
        <div className='container-app-info'>
         {/* <div className="app-head" style={{color:'white',fontWeight: 'bold'}}>App Info</div> */}
            <div className="info-container">
                <div className="sidebar-icon">
                    Hostname
                </div>
                <p className="info-text">{window.location.origin}</p>
            </div>
            <div className='space-box-div'></div>
            <div className="info-container">
                <div className="sidebar-icon">
                    UserID
                </div>
                <p className="info-text">{seller._id}</p>
            </div>
            <div className='space-box-div'></div>

            <div className="info-container-version">
                <div className="version-info">
                    <div className="sidebar-icon">
                        App version
                    </div>
                    <p className="info-text">4.5.1</p>
                </div>
                <div className="version-info">
                    <div className="sidebar-icon">
                        Backend version
                    </div>
                    <p className="info-text">1.5.1</p>
                </div>
            </div>
        </div>
        </>
       
    )
}

export default AppInfo;
