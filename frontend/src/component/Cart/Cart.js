import React, { Fragment } from 'react';
import './Cart.css';
import CartItemCard from './CartItemCard';

const Cart = () => {

    const item = {
        product: "productId",
        price: 12000,
        name: "Monkey NFT"
    }
    return (
        <Fragment>
            <div className='cartPage'>
                <div className='cartHeader'>
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>SubTotal</p>
                </div>
                <div className='cartContainer'>
                    <CartItemCard item={item} />
                </div>
            </div>
        </Fragment>
    )
}

export default Cart;