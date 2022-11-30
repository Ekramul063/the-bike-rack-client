import React from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
const googleProvider = new GoogleAuthProvider();
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {logIn,signINWithGoole} = useContext(AuthContext);
    const location = useLocation();
    const from = location?.state?.from?.path || '/';
    const navigate = useNavigate()
    const googleSignIn = event => {
        event.preventDefault();
        signINWithGoole(googleProvider)
            .then(result => {
                navigate(from,{replace:true})
            })
            .catch(error => console.error(error.message))
    }
    const handlelogIn = data =>{
        logIn(data.email,data.password)
        .then(result =>{
            navigate(from,{replace:true})
        })
        .catch(err => console.error(err))
        
    };
    return (
        <div className='flex items-center justify-center h-[600px] '>
            <div className='drop-shadow-xl border border-spacing-1 px-7 py-14'>
                <h3 className='text-2xl font-bold text-center mb-10'>LOGIN</h3>
                <form onSubmit={handleSubmit(handlelogIn)} className ='max-w-[500px]'>

                    {/* include validation with required or other standard HTML validation rules */}
                    <input {...register("email",{ required: "Email field is required" })} type="email" placeholder="Email" className="input input-bordered w-full mb-4" />
                    {errors.email && <p className='text-red-800 mt-2' role="alert">{errors.email?.message}</p>}

                    <input {...register("password", { required: "password field is required" })} type="password" placeholder="Password" className="input input-bordered w-full mb-4" />
                    {/* errors will return when field validation fails  */}
                    {errors.password && <p className='text-red-800 mt-2' role="alert">{errors.password?.message}</p>}
                    <label>
                       <Link> Forget password ?</Link>
                    </label>
                    <div className="flex justify-center">
                        <input type="submit" value='LogIN' className='btn btn-primary' />
                    </div>

                    <p className='mt-3 text-center'>Have Account in The Bike Rack ? <Link to={'/register/signup'} className='text-primary '>Please SignUp</Link></p>
                        <div className="flex flex-col w-full border-opacity-50">
                            <div className="divider">OR</div>
                        </div>
                        <div onClick={googleSignIn} className="btn btn-outline flex justify-center">CONTINUE WITH GOOGLE</div>
                   
                </form>
            </div>

        </div>
    );
};

export default Login;