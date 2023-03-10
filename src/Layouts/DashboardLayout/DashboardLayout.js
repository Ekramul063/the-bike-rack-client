import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import Navbar from '../../SharedComponents/Navbar/Navbar';

const DashboardLayout = () => {
    const {user} = useContext(AuthContext);

    const [isAdmin] = useAdmin(user?.email);

    const {data:dbUser = {}}=useQuery({
        queryKey:['user',user?.email],
        queryFn:async()=>{
            const res = await fetch(`https://the-bike-rack-server-coral.vercel.app/users/${user?.email}`);
            const data = await res.json();
            return data;
        }
    })
   
    return (
        <div>
            <Navbar></Navbar>
            <label htmlFor="sidebar" tabIndex={2} className="btn btn-ghost lg:hidden border border-red-600">
                <div className="flex items-center">
                <div className="w-1 h-5 bg-red-400"></div>
                <div className="w-1 h-4 bg-red-500"></div>
                <div className="w-1 h-3 bg-red-600"></div>
                </div>
            </label>
            <div className="drawer drawer-mobile">
                <input id="sidebar" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content ">
                    <Outlet>

                    </Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="sidebar" className="drawer-overlay"></label>
                    
                    <ul className="menu p-4 w-80 bg-blue-200 text-base-content">
                    <div className=" p-2 w-full flex justify-center mb-6 flex-col items-centerg">
                        {
                            user?.uid?
                            <img className='h-[80px] w-[80px] rounded rounded-ful' src={user?.photoURL}alt="Profile" />
                            :
                            <h2 className="font-bold text-red-800 text-xl">No account founded <br/> Please LogIn or SignUp </h2>

                    }
                   
                    <h3 className='mt-3 font-bold'>{user?.displayName? user.displayName: user?.email}</h3>
                    </div>
                        {isAdmin &&
                             <li className='border mb-3'><Link to={'/dashboard/all-seller'}>All Seller</Link></li>
                        }   
                        {
                             <li className='border mb-3'><Link to={'/dashboard'}>Order List</Link></li>
                        }   

                        {
                            dbUser?.seller? <li className='border'><Link to={'/dashboard/add-product'}>Add Product</Link></li>:''
                        }   
                       
                    </ul>

                </div>
            </div>
          

        </div>
    );
};

export default DashboardLayout;