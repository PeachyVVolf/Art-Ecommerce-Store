import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import styles from './productStyles';
import { withStyles } from '@material-ui/styles';

const options = {
    edit: false,
    color: "black",
    activeColor: "tomato",
    value: 2.5,
    isHalf: true,
    size: window.innerWidth < 700 ? 15: 20
}

const Product = ({product, classes}) => {
    return ( 
        <Link className={classes.productCard} to={product._id}>
            <img src={product.image[0].url} alt={product.name}/>
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} /><span> (256) Reviews</span>
            </div>
            <span>{product.price}</span>
        </Link>
     );
};

export default withStyles(styles)(Product);