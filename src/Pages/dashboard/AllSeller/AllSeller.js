import { useQuery } from '@tanstack/react-query';
import { deleteUser } from 'firebase/auth';
import React from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import Loading from '../../../Components/Loading/Loading';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const AllSeller = () => {
    const {removeUser} = useContext(AuthContext)
    const { data: sellers = [], isLoading,refetch} = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('https://the-bike-rack-server-coral.vercel.app/users/seller');
            const data = await res.json();
            return data;
        }
    })

    const handleMakeAdmin = id => {
        fetch(`https://the-bike-rack-server-coral.vercel.app/users/seller/${id}`,{
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

        const handleDeleteSeller = (id,email) =>{
            console.log(id,email)
            fetch(`https://the-bike-rack-server-coral.vercel.app/users/seller/${id}`,{
                method:'DELETE',
                headers:{
                    'authorization':`bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res=>res.json())
            .then(data =>{
                console.log(data)
                if(data.deletedCount > 0){
                    console.log(data)
                    removeUser(email)
                    .then(()=>{
                    })
                    .catch(error => console.log(error))

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
                                            <td className='py-4'> <button onClick={()=> handleDeleteSeller(seller._id,seller.email)} className='btn btn-xs bg-red-800 '>Delete</button> </td>
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