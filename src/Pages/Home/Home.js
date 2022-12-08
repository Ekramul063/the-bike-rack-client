import React from 'react';
import BuyProductModal from '../../Components/Modal/BuyProductModal';
import Products from '../Products/Products';
import Header from './Header/Header';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Products></Products>
            
        </div>
    );
};

export default Home;