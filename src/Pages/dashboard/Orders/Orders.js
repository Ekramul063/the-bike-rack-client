import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Loading from '../../../Components/Loading/Loading';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import Order from './Order';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const { data: orders = []} = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://the-bike-rack-server-coral.vercel.app/bookings/${user?.email}`,{
                headers:{
                    'authorization':`bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(orderProduct => <Order key={orderProduct._id} orderProduct={orderProduct}></Order>)
                        }
                    </tbody>

                </table>
            </div>
            :
            <h3 className='text-center text-red-800 mt-7 text-2xl font-bold'>You have no order now</h3>

            }
           

        </div>
    );
};

export default Orders;