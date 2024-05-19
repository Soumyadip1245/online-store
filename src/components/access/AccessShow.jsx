import React, { useEffect, useState } from "react";
import Access from "../../models/access";
import { useNavigate } from "react-router-dom";
import './Access.css'
const AccessShow = ({ access: initialAccess, deleteAccess }) => {
  const navigate = useNavigate()
  const [accessOriginal, setAccess] = useState(new Access());
  useEffect(() => {
    setAccess(initialAccess);
  }, [initialAccess]);
  const editButton = () =>{
    navigate("/access-edit/"+accessOriginal._id)
  }
  const deleteButton = () =>{
    deleteAccess(accessOriginal)
  }
  return <div >
    <div className="card-design card-flex">
    <p className="written">{accessOriginal.staffName}</p>
    <div className="button-flex">
    <i class="fa-solid fa-pen-to-square" onClick={editButton}></i>
    <i class="fa-solid fa-trash" onClick={deleteButton}></i>
    </div>
    </div>
  </div>
};

export default AccessShow;
