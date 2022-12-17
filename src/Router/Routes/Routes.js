import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../Layouts/DashboardLayout/DashboardLayout';
import Main from '../../Layouts/Main/Main';
import RegisterLayout from '../../Layouts/RegisterLayout/RegisterLayout';
import Blogs from '../../Pages/Blogs/Blogs';
import Brand from '../../Pages/Brand/Brand';
import AddProduct from '../../Pages/dashboard/AddProduct/AddProduct';
import AllSeller from '../../Pages/dashboard/AllSeller/AllSeller';
import Orders from '../../Pages/dashboard/Orders/Orders';
import Payment from '../../Pages/dashboard/Payment/Payment';
import Home from '../../Pages/Home/Home';
import Login from '../../Pages/LogIn/Login';
import SignUp from '../../Pages/SignUp/SignUp';
import WrongPage from '../../Pages/WrongPage/WrongPage';
import AdminRoute from '../AdminRoute/AdminRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            // {
            //     path:'/',
            //     loader:fetch('https://the-bike-rack-server-coral.vercel.app/products'),
            //     element:<Products></Products>
            // },
            {
                path:'/categories/:name',
                loader: async ({params}) => {
                    return fetch(`https://the-bike-rack-server-coral.vercel.app/categories/${params.name}`);
                  },
                element:<PrivateRoute><Brand></Brand></PrivateRoute>
            },
            {
                path:'suzuki',

                element:<PrivateRoute></PrivateRoute>
            }
        ]
    },
    // DashBoard Layout
    {
        path:'/dashboard',
        element:<DashboardLayout></DashboardLayout>,
        children:[
           {
            path:'/dashboard/add-product',
            element:<PrivateRoute><AddProduct></AddProduct></PrivateRoute>
           },
           {
            path:'/dashboard',
            element:<PrivateRoute><Orders></Orders></PrivateRoute>
           },
           {
            path:'/dashboard/all-seller',
            element:<AdminRoute><AllSeller></AllSeller></AdminRoute>
           },
           {
            path:'/dashboard/payment/:id',
            loader:({params})=>fetch(`http://localhost:5000/payments/${params.id}`),
            element:<PrivateRoute><Payment></Payment> </PrivateRoute>
           },
        ]
    },
//register layout
    {
        path:'/register',
        element:<RegisterLayout></RegisterLayout>,
        children:[
            {
                path:'/register/login',
                element:<Login></Login>
            },
            {
                path:'/register/signup',
                element:<SignUp></SignUp>
            },
        ]
    },
    {
        path:'/blogs',
        element:<Blogs></Blogs>
    },
    {
        path:'*',
        element:<WrongPage></WrongPage>
    }

])
   

export default router;