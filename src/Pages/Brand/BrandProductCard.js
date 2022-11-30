import React from 'react';

const BrandProductCard = ({product}) => {
    const { name, price, image, categoryName, condition, description, phone, officialPrice, yearOfPurchase, location }=product;
    return (
        <div className="card w-full bg-base-100 shadow-xl">
        <figure><img src={image} alt="bike" /></figure>
        <div className="card-body">
            <h2 className="card-title">
                {name}
            </h2>
            <p>{description}</p>
            <div className="card-actions justify-end">
                <div className="badge badge-outline">Details</div>
                <div className="badge badge-outline">Buy Now</div>
            </div>
        </div>
    </div>
    );
};

export default BrandProductCard;