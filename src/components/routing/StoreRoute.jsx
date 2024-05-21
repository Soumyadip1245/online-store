import React, { useEffect } from 'react'
import StoreLayout from './StoreLayout';
import StoreLogin from '../storeLink/store-login/StoreLogin.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeLogin } from '../../store/storeSlice';

const StoreRoute = () => {
    const { loggedIn, checkStatus, user } = StoreLayout();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            
            if (user) {
                const ob = {
                    email: user.email
                  };
                  dispatch(storeLogin(ob))
            };
        }
        fetchData();
    }, [user])

    return (
        <>
            {loggedIn ?
                <StoreLogin value={true}/> : <StoreLogin  value={false}/>}
        </>
    )
}

export default StoreRoute