import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../Layouts/DashboardLayout/DashboardLayout';
import Main from '../../Layouts/Main/Main';
import RegisterLayout from '../../Layouts/RegisterLayout/RegisterLayout';
import Brand from '../../Pages/Brand/Brand';
import AddProduct from '../../Pages/dashboard/AddProduct/AddProduct';
import Home from '../../Pages/Home/Home';
import Login from '../../Pages/LogIn/Login';
import SignUp from '../../Pages/SignUp/SignUp';
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
            {
                path:'/categories/:name',
                loader: async ({params}) => {
                    return fetch(`http://localhost:5000/categories/${params.name}`);
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
            element:<AddProduct></AddProduct>
           }
        ]
    },

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
])
   

export default router;