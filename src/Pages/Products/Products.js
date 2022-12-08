import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import BuyProductModal from '../../Components/Modal/BuyProductModal';
import ProductsCard from './ProductsCard';
const Products = () => {
    const [buyProduct,setBuyProduct] = useState({});

    const {data:products,isLoading} = useQuery({
        queryKey:['products'],
        queryFn:async()=>{
            const res = await fetch('https://the-bike-rack-server-coral.vercel.app/products');
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
                setBuyProduct={setBuyProduct}

                ></ProductsCard>)
            }
            <BuyProductModal buyProduct={buyProduct}></BuyProductModal>
        </div>
    );
};

export default Products;