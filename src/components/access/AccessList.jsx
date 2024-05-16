import React from 'react'
import AccessShow from './AccessShow';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Access from '../../models/access';

const AccessList = ({accessList,seller,deleteAccess}) => {
    const navigate = useNavigate();
    const onAddNewStaffClick = () =>{
        navigate('/access-edit')
    }
   
  return (
  <div className="access-container">
     <div className="card-design">
     <p className="staff-name">Staff Details</p>
    <Typography mb={2} variant="body1"  style={{color: 'white'}}>
          <a
            onClick={onAddNewStaffClick}
            style={{ color: "var(--color-text)", fontWeight:'bold' }}
          >
            Click 
          </a>{" "}
          here to add new staffs
        </Typography>

        {accessList.map((curr) => {
          return (
            <AccessShow key={curr} access={curr} deleteAccess={deleteAccess} />
          );
        })}
   </div>
  </div>
  )
}

export default AccessList