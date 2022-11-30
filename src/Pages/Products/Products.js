import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Components/Loading/Loading';
import ProductsCard from './ProductsCard';
const Products = () => {
    const {data:products,isLoading} = useQuery({
        queryKey:['products'],
        queryFn:async()=>{
            const res = await fetch('http://localhost:5000/products');
            const data= await res.json();
            return data 
        }
    })
    
    if(isLoading){
        <Loading></Loading>
    }
   
    return (
        <div className='p-5'>
            {
                products?.map(product => <ProductsCard
                key={product._id}
                product={product}
                ></ProductsCard>)
            }
        </div>
    );
};

export default Products;