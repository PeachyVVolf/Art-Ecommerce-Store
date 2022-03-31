import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import styles from './productStyles';
import { withStyles } from '@material-ui/styles';

const Product = ({product, classes}) => {
    
const options = {
    edit: false,
    color: "black",
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 700 ? 15: 20
};

    return ( 
        <Link className={classes.productCard} to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name}/>
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} /><span> {`${product.numberOfReviews} Reviews`}</span>
            </div>
            <span>{`Rs. ${product.price}`}</span>
        </Link>
     );
};

export default withStyles(styles)(Product);