import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StoreDetails from '../../stores/StoreDetails';
import ProductEdit from '../../products/ProductEdit';
import PaymentDetails from '../../payments/payment-details/PaymentDetails';
import { Button } from '@mui/material';
import Seller from '../../../models/seller';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetUser } from '../../login/Auth';
import Store from '../../../models/store';
import Dashboard from '../Dashboard';
import Profile from '../../profile/Profile';
const StepperChoose = ({stepperToggle}) => {
  const [seller, setSeller] = useState(new Seller());
  const [store, setStore] = useState(new Store());
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate()
  useEffect(() => {
    if (user != null) {
      const fetchData = async () => {
        const userData = await GetUser(user);
        
        store.sellerId = userData._id;
        const storeData = await store.getStoreBySeller(userData._id);
        
        if (!storeData) {
          await store.create();
          setStore(store);
        } else setStore(storeData);

        setSeller(userData);
      };
      fetchData();
    }
  }, [user]);
    const steps = [
        'Create your project profile',
        'Create your online store',
        'Set up your stores products',
        'Set up payments details',
      ];

      const [activeStep, setActiveStep] = useState(0);
      const handleNext = (seller = null) => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        
        if(activeStep == 3){
          stepperToggle(seller)
        }
      };

      const renderStepComponent = (step) => {
        switch (step) {
          case 0:
            return <Profile profileSuccess = {handleNext} stepper={true}/>; 
          case 1:
            return <StoreDetails storeSuccess = {handleNext} stepper={true} store={store}/>
          case 2:
            return <ProductEdit productSuccess={handleNext} stepper={true}/>; 
          case 3:
            return <PaymentDetails paymentSuccess={handleNext} stepper={true}/>; 
          default:
            return null;
        }
    }
  return (
    <Box sx={{ width: '100%' }}>
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    {renderStepComponent(activeStep)}
  </Box>
  )
}

export default StepperChoose