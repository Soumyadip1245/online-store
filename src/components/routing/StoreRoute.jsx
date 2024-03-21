import React, { useEffect } from 'react'
import StoreLayout from './StoreLayout';
import Loader from '../../utils/loader/Loader';
import StoreLogin from '../storeLink/store-login/StoreLogin';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeLogin } from '../../store/storeSlice';
import StoreSplash from '../storeLink/store-splash/StoreSplash';

const StoreRoute = ({ component: Component, ...rest }) => {
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
                <Component {...rest} /> : <StoreLogin />}
        </>
    )
}

export default StoreRoute