import React, { Fragment, useEffect, useState, useLayoutEffect } from 'react';
import {Carousel} from '3d-react-carousal';
import styles from './ProductDetailsStyles';
import { withStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import './productDetailsStyles.css';
import { clearErrors, getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard';
import {useAlert} from "react-alert";
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';

const ProductDetails = ({classes}) => {

    const alert = useAlert();
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();
    const params = useParams();
    const { product,loading, error } = useSelector(state=>state.productDetails);

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        if(product.Stock > quantity)
            setQuantity(quantity + 1);
    }

    const decreaseQuantity = () => {
        if(quantity > 1)
            setQuantity(quantity - 1);
    }

    const saveIntoSlides = async () => {
        product.images &&
        product.images.map((item, i) => {
           setImages(images => [...images, <img className={`carouselImage ${classes.carouselImage}`} src={item.url} alt={i}/>])
        });
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(params.id, quantity));
        alert.success("Item Added to Cart.");
    }

    useLayoutEffect(() => {
        if(images.length <= 0){
            saveIntoSlides();
        }
    })

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(params.id));
        saveIntoSlides();
    }, [dispatch, params.id, error, alert]);

    const options = {
        edit: false,
        color: "white",
        activeColor: "tomato",
        value: product.ratings,
        isHalf: true,
        size: window.innerWidth < 700 ? 15: 20
    };

    return ( 
        <Fragment>
            {loading ? <Loader /> :
                (<div>
                    <MetaData title={`${product.name} -- Artyft`} />
                    <div className={`ProductDetails ${classes.ProductDetails}`}>
                        <div className={`carousel ${classes.carousel}`}>
                            <Carousel slides={images} autoplay={false} interval={3000}/>
                        </div>
                        <div className={`details ${classes.details}`}>
                            <div className={`detailsBlock1 ${classes.detailsBlock1}`}>
                                <h1>{product.name}</h1>
                            </div>
                            <br/>
                            <div className={`detailsBlock2 ${classes.detailsBlock2}`}>
                                <ReactStars {...options} />
                                <span>({product.numberOfReviews} Reviews)</span>
                            </div>
                            <br/>
                            <div className={`detailsBlock3 ${classes.detailsBlock3}`}>
                                <h1>{`Rs. ${product.price}`}</h1>
                                <div className={`detailsBlock31 ${classes.detailsBlock31}`}>
                                    <div className={`detailsBlock311 ${classes.detailsBlock311}`}>
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button onClick={addToCartHandler} className={`addToCart ${classes.addToCart}`}>Add to Cart</button>
                                </div>
                                <p>
                                    Status:
                                    <b className={product.Stock < 1 ? classes.redColor : classes.greenColor}>
                                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>

                            <div className={`detailsBlock4 ${classes.detailsBlock4}`}>
                                Description: <p>{`description ${product.description}`}</p>
                            </div>

                            <button className={`submitReview ${classes.submitReview}`}>Submit Review</button>

                        </div>
                    </div>
                    <h3 className='reviewsHeading'>REVIEWS</h3>
                    {product.reviews && product.reviews[0] ? (
                        <div className='reviews'>
                            {product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)}
                        </div>
                    ): (
                        <p className='noReviews'>NO REVIEWS YET</p>
                    ) }
                </div>
                )
            }
        </Fragment>
     );
}

export default withStyles(styles)(ProductDetails);