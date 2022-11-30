import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import Navbar from '../../SharedComponents/Navbar/Navbar';

const DashboardLayout = () => {
    const {user} = useContext(AuthContext);
    const {data:dbUser,isLoading}=useQuery({
        queryKey:['user',user?.email],
        queryFn:async()=>{
            const res = await fetch(`https://the-bike-rack-server-coral.vercel.app/users/${user?.email}`);
            const data = await res.json();
            return data;
        }
    })
    if(isLoading){
        return <Loading></Loading>
    }
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
                    <img className='h-[80px] w-[80px] rounded rounded-ful' src={user.photoURL}alt="" />
                        <h3 className='mt-3 font-bold'>{user?.displayName? user.displayName: user.email}</h3>
                    </div>
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