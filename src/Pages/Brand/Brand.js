import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Brand = () => {
    const brand = useLoaderData({});
    return (
        <div>
           <h2 className='font-bold text-2xl text-orange-600 underline '> {brand?.categoryName}</h2>
            
        </div>
    );
};

export default Brand;