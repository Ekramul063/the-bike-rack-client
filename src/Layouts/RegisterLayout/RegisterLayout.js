import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../SharedComponents/Navbar/Navbar';

const RegisterLayout = () => {
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
           <Outlet>

           </Outlet>
          

        </div>
    );
};

export default RegisterLayout;