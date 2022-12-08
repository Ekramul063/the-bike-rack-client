import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../Components/Loading/Loading';

const AllSeller = () => {
    const {data:sellers = [],isLoading}= useQuery({
        queryKey:['sellers'],
        queryFn:async()=>{
            const res = await fetch('https://the-bike-rack-server-coral.vercel.app/users/seller');
            const data = await res.json();
            return data ;
        }
    })
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div>
        {
            sellers.length > 0 ?
            <div className="overflow-x-auto">
            <table className="table table-compact w-full">
                <thead>
                    <tr>
                        <th className='py-4'>Name</th>
                        <th className='py-4'>Email</th>
                        <th className='py-4'>Phone</th>
                        <th className='py-4'>Make Admin</th>
                        <th className='py-4'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sellers.map((seller) =><tr key={seller._id}>
                            <td className='py-4'>{seller.name}</td>
                            <td className='py-4'>{seller.email}</td>
                            <td className='py-4'>{seller.phone}</td>
                            <td className='py-4'><button className='btn btn-xs  bg-green-800'>Make Admin</button></td>
                            <td className='py-4'> <button className='btn btn-xs bg-red-800 '>Delete</button> </td>
                        </tr>)
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

export default AllSeller;