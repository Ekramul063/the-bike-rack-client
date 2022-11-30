
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const imageHostKey = process.env.REACT_APP_imgbb_key;
    console.log(imageHostKey)
    const handleAddProduct = data => {
        const image = data.image[0]
        console.log(data)

    }

    const { data: brands = [] } = useQuery({
        queryKey: ['brand'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories');
            const data = await res.json();
            return data;
        }
    });


    return (
        <div>
            <div className='flex items-center justify-center my-11'>
                <div className=' border border-spacing-1 px-7 py-14'>
                    <h3 className='text-2xl font-bold text-center mb-10'>Add Product</h3>
                    <form className='w-[385px]' onSubmit={handleSubmit(handleAddProduct)}>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Bike Name</span>
                            </label>
                            <input  {...register("name", { required: "Name field is required" })} type="text" className="input input-bordered w-full " />
                            {errors.name && <p className='text-red-800 mt-2' role="alert">{errors.name?.message}</p>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input  {...register("price", { required: "Price field is required" })} type="text" className="input input-bordered w-full " />
                            {errors.price && <p className='text-red-800 mt-2' role="alert">{errors.price?.message}</p>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Brand Name</span>
                            </label>
                            <select  {...register("brand", { required: "Brand Name field is required" })} className="select select-bordered w-full">
                                <option disabled defaultValue>Select Brand</option>
                                {
                                    brands.map(brand => <option key={brand._id} value={brand.categoryName}>{brand.categoryName}</option>)
                                }
                                
                            </select>
                            
                            {errors.brand && <p className='text-red-800 mt-2' role="alert">{errors.brand?.message}</p>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Showroom Price</span>
                            </label>
                            <input  {...register("newPrice", { required: "Showroom Price field is required" })} type="text" className="input input-bordered w-full " />
                            {errors.newPrice && <p className='text-red-800 mt-2' role="alert">{errors.newPrice?.message}</p>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Bike condition</span>
                            </label>
                            <select {...register("condition", { required: " Bike condition field is required" })} className="select select-bordered w-full">
                                <option>Excellent</option>
                                <option>Good</option>
                                <option>Fair</option>
                            </select>
                            {errors.condition && <p className='text-red-800 mt-2' role="alert">{errors.condition?.message}</p>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Year of purchase</span>
                            </label>
                            <input  {...register("purchase", { required: "Year of purchase field is required" })} type="date" className="input input-bordered w-full " />
                            {errors.purchase && <p className='text-red-800 mt-2' role="alert">{errors.purchase?.message}</p>}
                        </div>


                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input  {...register("phone", { required: "Phone number field is required" })} type="text" className="input input-bordered w-full " />
                            {errors.phone && <p className='text-red-800 mt-2' role="alert">{errors.phone?.message}</p>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <textarea  {...register("location", { required: "location field is required",maxLength: 50 })} type="text" className="h-[60px] input input-bordered w-full " />
                            {errors.location && <p className='text-red-800 mt-2' role="alert">{errors.location?.message}</p>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea {...register("describe", { required: "Product Description is required" })} type="text" className="input input-bordered w-full h-[8rem]" />
                            {errors.describe && <p className='text-red-800 mt-2' role="alert">{errors.describe?.message}</p>}
                        </div>

                        <div className="form-control w-full ">
                            <label className="label">

                            </label>
                            <input  {...register("image", { required: "Image field is required" })} type="file" className="file-input file-input-bordered w-full max-w-xs" />

                            {errors.image && <p className='text-red-800 mt-2' role="alert">{errors.image?.message}</p>}
                        </div>




                        <input type="submit" value='Add Product' className='btn btn-accent w-full mt-5' />
                    </form>
                </div>

            </div>
        </div>
    );
};

export default AddProduct;