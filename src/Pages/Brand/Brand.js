import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Components/Loading/Loading';
import { useLoaderData } from 'react-router-dom';
import BrandProductCard from './BrandProductCard';

const Brand = () => {
    const brand = useLoaderData();
    const { data: products, isLoading } = useQuery({
        queryKey: ['products',brand?.categoryName],
        queryFn: async () => {
            const res = await fetch(`https://the-bike-rack-server-coral.vercel.app/products/${brand?.categoryName}`);
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
       return <Loading></Loading>
    }
    return (
        <div className='p-5'>
            <h2 className='font-bold text-2xl text-orange-600 underline '> {brand?.categoryName}</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 my-10 gap-2">
               {
                products?.map(product => <BrandProductCard
                key={product._id}
                product={product}
                >
                </BrandProductCard>)
               }
            </div>

        </div>
    );
};

export default Brand;