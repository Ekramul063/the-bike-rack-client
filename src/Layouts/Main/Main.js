import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../../SharedComponents/Footer/Footer';
import Loading from '../../Components/Loading/Loading';
import Navbar from '../../SharedComponents/Navbar/Navbar';

const Main = () => {
    const {data:categories,isLoading} = useQuery({
        queryKey:['categories'],
        queryFn:async()=>{
            const res = await fetch('https://the-bike-rack-server-coral.vercel.app/categories');
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
                    <ul className="menu p-4 w-80 bg-blue-200  font-bold text-lg h-full">
                        {
                            categories.map(category =><li
                            key={category._id}
                            ><Link to={`/categories/${category.categoryName}`}>{category.categoryName}</Link></li>)
                        }
                        
                        
                       
                    </ul>

                </div>
            </div>
            <Footer></Footer>

        </div>
    );
};

export default Main;