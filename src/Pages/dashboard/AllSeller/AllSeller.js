import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import Loading from '../../../Components/Loading/Loading';

const AllSeller = () => {
    const { data: sellers = [], isLoading,refetch} = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users/seller');
            const data = await res.json();
            return data;
        }
    })

    const handleMakeAdmin = id => {
        fetch(`http://localhost:5000/users/seller/${id}`,{
            method: 'PUT',
            headers:{
               'authorization':`bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0){
                    toast.success('make admin successfully');
                    refetch();
                }
            })
        }

        const handleDeleteSeller = id =>{
            fetch(`http://localhost:5000/users/seller/${id}`,{
                method:'DELETE',
                headers:{
                    'authorization':`bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res=>res.json())
            .then(data =>{
                console.log(data)
                if(data.deletedCount > 0){
                    toast.error('Delete seller successfully');
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
                                        sellers.map((seller) => <tr key={seller._id}>
                                            <td className='py-4'>{seller.name}</td>
                                            <td className='py-4'>{seller.email}</td>
                                            <td className='py-4'>{seller.phone}</td>
                                            <td className='py-4'>
                                            {  seller.role !== 'admin' &&
                                                <button onClick={() => handleMakeAdmin(seller._id)} className='btn btn-xs  bg-green-800'>Make Admin</button>
                                            }
                                            </td>
                                            <td className='py-4'> <button onClick={()=> handleDeleteSeller(seller._id)} className='btn btn-xs bg-red-800 '>Delete</button> </td>
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