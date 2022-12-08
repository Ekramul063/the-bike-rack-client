import React from 'react';
const ProductsCard = ({product,setBuyProduct}) => {

    const { name, price, image, categoryName, condition, description, phone, officialPrice, yearOfPurchase, location } = product
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl mb-7">
            <figure className='max-w-[250px]' ><img src={image} className="w-full" alt="Album" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                <label onClick={()=> setBuyProduct({name,price,phone,location})} htmlFor="buy-product-modal" className="btn btn-primary">Buy Now</label>

                </div>
            </div>
        </div>
    );
};

export default ProductsCard;