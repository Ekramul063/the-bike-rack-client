import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loading from '../../../Components/Loading/Loading';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import ConfirmationModal from '../../../SharedComponents/ConfirmationModal/ConfirmationModal';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [cancelOrder, setCancelOrder] = useState(null);
    const closeModal = () => {
        setCancelOrder(null);
    }
    const { data: orders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://the-bike-rack-server-coral.vercel.app/bookings/${user?.email}`, {
                headers: {
                    'authorization': `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    const handleCancelOrder = () => {
        fetch(`https://the-bike-rack-server-coral.vercel.app/bookings/${cancelOrder?._id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    toast.success('order cancel successfully');
                    refetch()
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            {
                orders.length > 0 ?
                    <div className="overflow-x-auto">
                        <table className="table table-compact w-full">
                            <thead>
                                <tr>
                                    <th>Sl</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Location</th>
                                    <th>Payment</th>
                                    <th>Cancel Order</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map(
                                        (orderProduct, index) => <tr key={orderProduct._id}>
                                            <td>{index + 1}</td>
                                            <td>{orderProduct.name}</td>
                                            <td>{orderProduct.price} Taka</td>
                                            <td>{orderProduct.location}</td>
                                            <td>
                                                {orderProduct.price && !orderProduct.paid &&
                                                    <Link to={`/dashboard/payment/${orderProduct._id}`}><button className="btn btn-xs btn-primary">Pay Now</button></Link>}
                                                {orderProduct.price && orderProduct.paid &&
                                                    <button className="btn btn-xs bg-green-600">Paid</button>}
                                            </td>

                                            <td>{!orderProduct.paid &&
                                                <label onClick={() => setCancelOrder(orderProduct)} htmlFor="confirmation-modal" className="btn btn-xs bg-red-800">cancel</label>}</td>

                                        </tr>
                                    )
                                }
                            </tbody>

                        </table>

                        {cancelOrder &&
                            <ConfirmationModal
                                title={'Are you sure'}
                                description={`Cancel your order ${cancelOrder?.name}`}
                                actionName={'ok'}
                                modalData={cancelOrder}
                                closeModal={closeModal}
                                operation={handleCancelOrder}
                            >

                            </ConfirmationModal>}
                    </div>
                    :
                    <h3 className='text-center text-red-800 mt-7 text-2xl font-bold'>You have no order now</h3>

            }


        </div>
    );
};

export default Orders;