import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData} from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const paymentData = useLoaderData({});
    const { price, name } = paymentData; 
   
    return (
        <>
        <div className='p-6'>
            <h3 className='text-lg font-semibold'>Payment for {name}</h3>
            <p  className='text-lg font-semibold'>To confirm your order payment <strong> {price}</strong> Taka only</p>
        </div>
         <Elements stripe={stripePromise}>
         <CheckoutForm paymentData={paymentData}></CheckoutForm>
       </Elements>
        </>
    );
};

export default Payment;