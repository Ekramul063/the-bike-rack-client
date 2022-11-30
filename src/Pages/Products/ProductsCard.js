import React from 'react';

const ProductsCard = ({ product }) => {
    const { name, price, image, categoryName, condition, description, phone, officialPrice, yearOfPurchase, location } = product
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl mb-7">
            <figure><img src={image} alt="Album" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductsCard;