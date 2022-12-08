import React from 'react';

const Order = ({ orderProduct }) => {
    const { name, price, location } = orderProduct;
    let i = 1;

    return (

            <tr>
                <th>{i++}</th>
                <td>{name}</td>
                <td>{price} Taka</td>
                <td>{location}</td>
            </tr>
    );
};

export default Order;