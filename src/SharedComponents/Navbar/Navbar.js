import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../asets/logo.png'
import Loading from '../../Components/Loading/Loading';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Navbar = () => {
    const { user,logOut } = useContext(AuthContext);

    const {data:dbUser = {}} = useQuery({
        queryKey:['user',user?.email],
        queryFn : async()=>{
            const res = await fetch(`http://localhost:5000/users/${user?.email}`);
            const data = await res.json();
            return data;

        }
    })
   
   
   const handleLogOut=()=>{
    logOut()
    .then(()=>{

    })
    .catch(err => console.error(err))
    }

    const navItems = <React.Fragment>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/'}>Home</Link></li>
        <li>
            {
                
                dbUser?.seller?
                <Link to={'/dashboard'}>Dashboard</Link>
                :
                <Link to={'/dashboard'}>My profile</Link>

            }
           
            </li>
        <li>
            {
                user?.uid ?
                    <Link onClick={handleLogOut}>LogOut</Link> : <Link to={'/register/login'}>Login</Link>

            }

        </li>
        <li><Link to={'/register/signup'}>SignUp</Link></li>
    </React.Fragment>

    
    return (
        <div className="navbar justify-between bg-blue-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <Link to={`/`}><img className='h-[100px] w-[120px]' src={logo} alt="logo" /></Link>
            </div>

            <div className=" hidden lg:flex ">
                <ul className="menu menu-horizontal p-0">
                    {navItems}
                </ul>
            </div>

            {/* <div className="navbar-end">
                <a className="btn">Get started</a>
            </div> */}
        </div>
    );
};

export default Navbar;