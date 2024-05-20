import React, { useEffect } from 'react'
import StoreLayout from './StoreLayout';
import StoreLogin from '../storeLink/store-login/StoreLogin';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeLogin } from '../../store/storeSlice';
import GeneratedShow from '../storeLink/store-show/GeneratedShow';
import StoreLink from '../storeLink/StoreLink';

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
                <StoreLink /> : <StoreLogin />}
        </>
    )
}

export default StoreRoute