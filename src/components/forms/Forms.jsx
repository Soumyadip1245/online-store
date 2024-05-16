import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { GetUser } from '../login/Auth';
import Seller from '../../models/seller';
const Forms = () => {
  const [seller, setSeller] = useState(new Seller());
  const user = useSelector((state) => state.auth.user);
  const fetchData = async () => {
    return await GetUser(user);
  };
  const { data, isLoading } = useQuery("forms", fetchData, { enabled: !!user })
  useEffect(() => {
    if (data) setSeller(data)
  }, [data])
const filledForm = async () =>{
  
}
  return (
    <div className="store-container">
      <div className="card-design">
        <h4 className="store-name">Easy Onboard</h4>
        <div className="input-text">
          <input
            type="text"
            name="phoneNumber"
            placeholder="enter your phone number"
            className="input-field"
            value={seller.mobile.number}
            disabled={true}
          />
          <p className="written text-wrap">Your loggedIn Phone number.</p>

        </div>
        <div className="input-text">
          <input
            type="text"
            name="phoneNumber"
            placeholder="enter your email Id"
            className="input-field"
            value={seller.profile.email.value}
            disabled={true}
          />
          <p className="written text-wrap">Your loggedIn email ID.</p>

        </div>
        <div className="input-text">
          <button className="btn-design" onClick={filledForm}>Have filled the Form</button>
          <p className="written text-wrap">If you have filled the google form than automatically we will create your store, product, payment, profile details.</p>


        </div>
        <div>

        </div>
      </div>
    </div>
  )
};

export default Forms;
