import React from 'react'
import AccessShow from './AccessShow';
import { useNavigate } from 'react-router-dom';

const AccessList = ({accessList,seller,deleteAccess}) => {
    const navigate = useNavigate();
    const onAddNewStaffClick = () =>{
        navigate('/access-edit')
    }
   
  return (
  <div className="access-container">
     <div className="card-design">
     <p className="staff-name">Staff Details</p>
    <p style={{color: 'white'}}>
          <a
            onClick={onAddNewStaffClick}
            style={{ color: "var(--color-text)", fontWeight:'bold' }}
          >
            Click 
          </a>{" "}
          here to add new staffs
        </p>

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