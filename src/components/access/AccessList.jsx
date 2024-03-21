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
    <>
      <Box m={2}>
      <Typography mb={2} variant="body1" >
          <a
            onClick={onAddNewStaffClick}
            style={{ color: "blue", cursor: "pointer" }}
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
      </Box>
    </>
  )
}

export default AccessList