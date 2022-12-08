import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import Loading from '../Loading/Loading';

const BuyProductModal = ({ buyProduct }) => {
    const { name, price, location } = buyProduct;
    const { user } = useContext(AuthContext);

    const { data: dbUser = [], isLoading } = useQuery({
        queryKey: ['dbUser', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://the-bike-rack-server-coral.vercel.app/users/${user?.email}`);
            const data = await res.json();
            return data;
        }
    })
    const handleBuyNow = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.title.value;
        const buyer = user?.email;
        const price = form.price.value;
        const location = form.location.value;
        const contact = form.userContact.value;

        const bookingProduct = {
            name,
            buyer,
            price,
            location,
            contact,
        }

        fetch('https://the-bike-rack-server-coral.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Order register successfully')
                }
            })

    }


    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div className='z[9999]'>
            <input type="checkbox" id="buy-product-modal" className="modal-toggle" />
            <div className="modal">
                <div className="card w-[500px] flex-shrink-0  shadow-2xl bg-base-100">

                    <form className='card-body' onSubmit={handleBuyNow}>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Bike Title</span>
                            </label>
                            <input defaultValue={name} disabled name='title' type="text" className="input input-bordered w-full mb-3" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Bike Price</span>
                            </label>
                            <input defaultValue={price} disabled name='price' type="text" className="input block input-bordered w-full mb-3" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Bike Location</span>
                            </label>
                            <input defaultValue={location} disabled name='location' type="text" className="input input-bordered w-full mb-3" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Buyer</span>
                            </label>
                            <input name='user' defaultValue={user?.uid ? user?.displayName : user?.email} disabled type="text" className="input input-bordered w-full mb-3" />
                        </div>
                        {
                            dbUser &&

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Buyer contact number</span>
                                </label>
                                <input name='userContact' defaultValue={dbUser.phone} disabled type="text" className="input input-bordered w-full mb-3" />
                            </div>

                        }
                        <input type="submit" value="Buy Now" className='btn btn-primary' />
                        <div className="modal-action">
                            <label htmlFor="buy-product-modal" className="btn">Close</label>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default BuyProductModal;