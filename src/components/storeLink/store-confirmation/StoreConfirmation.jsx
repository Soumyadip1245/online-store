import { Button } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Image from '../../assests/truck.png'
import { useStore } from '../store-context/StoreProvider';
const StoreConfirmation = () => {
  const { unique } = useParams();
  const navigate = useNavigate();
  const {clearData} = useStore()
  const backStore = () => {
    clearData()
    navigate(`/store/${unique}`);
    // window.location.reload()
  };

  return (
    <div style={{ textAlign: 'center', color: '#fff', backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ fontFamily: 'Netflix Sans, Arial, sans-serif', marginTop: '50px' }}>
        Order Placed Successfully!
      </h1>
      <div style={{ position: 'relative' }}>
        <img
          src={Image}
          alt="Netflix Gif"
          style={{ width: '100%', maxWidth: '500px', margin: '20px auto 0' }}
        />
        <Button
          type="primary"
          onClick={backStore}
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#e50914',
            borderColor: '#e50914',
            margin: '20px auto 0' 
          }}
        >
          Back to Store
        </Button>
      </div>
    </div>
  );
};

export default StoreConfirmation;
