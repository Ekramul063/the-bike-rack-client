
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Loading from '../../../Components/Loading/Loading';

import React, { useEffect } from 'react';
import { useState } from 'react';

const CheckoutForm = ({ paymentData }) => {
    const { price, name,buyer,_id } = paymentData;
    const [paymentError, setPaymentError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [success, setSuccess] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        fetch('https://the-bike-rack-server-coral.vercel.app/create-payment-intent',{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setClientSecret(data.clientSecret)
            })
    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log(error)
            setPaymentError(error.message)
        } else {
            setPaymentError('');
        }
        setSuccess('');
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: buyer
                    },
                },
            },
        );
        if (confirmError) {
            setPaymentError(confirmError.message)
            return
        }
       
        if (paymentIntent.status === "succeeded") {
            const payment = {
                price,
                transactionId:paymentIntent.id,
                email:buyer,
                bookingId:_id
            }

            fetch(`https://the-bike-rack-server-coral.vercel.app/payment`,{
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.insertedId) {
                        setSuccess(`Your payment completed successfully`);
                        setTransactionId(paymentIntent.id);

                    }
                })
        }
        setProcessing(false)

    }
    if (!clientSecret) {
        return <Loading></Loading>
    }
    return (
        <div className='max-w-[600px] p-5 mt-10'>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary w-full mt-12' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay Now
                </button>
            </form>

            <p className='text-red-800 font-semibold'>{paymentError}</p>
            {success &&
                <div className='text-center mt-3'>
                    <p className='text-green-600'>{success}</p>
                    <p className='text-orange-600'>TransactionID: <strong>{transactionId}</strong></p>
                </div>
            }

        </div>
    );
};

export default CheckoutForm;