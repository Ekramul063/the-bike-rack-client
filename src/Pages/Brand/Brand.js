import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Components/Loading/Loading';
import { useLoaderData } from 'react-router-dom';

const Brand = () => {
    const brand = useLoaderData({});
    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/${brand?.categoryName}`);
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        <Loading></Loading>
    }
    return (
        <div>
            <h2 className='font-bold text-2xl text-orange-600 underline '> {brand?.categoryName}</h2>

            <div className="grid grid-">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            Shoes!
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Fashion</div>
                            <div className="badge badge-outline">Products</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Brand;