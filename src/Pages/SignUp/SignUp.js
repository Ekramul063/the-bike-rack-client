import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {createAccount,userProfile} = useContext(AuthContext)
    const [signUpError ,setSignUpError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = data => {

        console.log(data)
        createAccount(data.email,data.password)
        .then(result =>{
            const userInfo ={
                displayName:data.name
            }
            userProfile(userInfo)
            .then(() => {})
            .catch(err => console.log(err));
            saveUser(data.name,data.email,data.seller,data.phone)
            toast.success('Create Account Successfully')
           navigate('/')

        })
        .catch(err => setSignUpError(err.message));
    }

    const saveUser = (name,email,seller,phone)=>{
        const user ={name,email,seller,phone}
        fetch('https://the-bike-rack-server-coral.vercel.app/users',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
        })

    }
    return (
        <div>
            <div className='flex items-center justify-center h-[800px] '>
                <div className='drop-shadow-xl border border-spacing-1 px-7 py-14'>
                    <h3 className='text-2xl font-bold text-center mb-10'>SIGNUP</h3>
                    <form className='w-[385px]' onSubmit={handleSubmit(handleSignUp)}>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input  {...register("name", { required: "Name field is required" })} type="text" className="input input-bordered w-full " />
                            {errors.name && <p className='text-red-800 mt-2' role="alert">{errors.name?.message}</p>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input  {...register("email", { required: "Email Address is required" })} type="email" className="input input-bordered w-full " />
                            {errors.email && <p className='text-red-800 mt-2' role="alert">{errors.email?.message}</p>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input  {...register("phone", { required: "Phone Address is required" })} type="text" className="input input-bordered w-full " />
                            {errors.email && <p className='text-red-800 mt-2' role="alert">{errors.phone?.message}</p>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input  {...register("password", {
                                required: "Password field is required",
                                minLength: {
                                    value: 6, message: 'password must be 6 characters or longer',
                                },
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }

                            })} type="password" className="input input-bordered w-full " />
                            {errors.password && <p className='text-red-800 mt-2' role="alert">{errors.password?.message}</p>}
                        </div>

                        <div className="form-control mt-3">
                            <label className="label cursor-pointer">
                                <span className="text-lg font-bold">Seller Account</span>
                                <input  {...register("seller")} type="checkbox"  className="checkbox" />
                            </label>
                        </div>


                        <input type="submit" value='SIGNUP' className='btn btn-accent w-full mt-5' />

                        {signUpError && <p className='text-red-800 mt-2' role="alert">{signUpError}</p>}

                        <p className='mt-3 text-center'>Have Account in The Bike Rack ? <Link to={'/login'} className='text-primary '>Please Login</Link></p>
                        <div className="flex flex-col w-full border-opacity-50">
                            <div className="divider">OR</div>
                        </div>
                        <div className="btn btn-outline flex justify-center">CONTINUE WITH GOOGLE</div>
                    </form>
                </div>

            </div>

        </div>
    );
};

export default SignUp;