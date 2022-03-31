import React, { Fragment, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import styles from './ProductDetailsStyles';
import { withStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';

const ProductDetails = ({classes}) => {

    const dispatch = useDispatch();
    const params = useParams();
    const { product,loading, error } = useSelector(state=>state.productDetails);

    useEffect(() => {
        dispatch(getProductDetails(params.id))
    }, [dispatch, params.id]);

    return ( 
        <Fragment>
            <div className={classes.ProductDetails}>
                <div>
                    <Carousel>
                        {product.images &&
                            product.images.map((item, i) => (
                                <img className={classes.CarouselImage} key={item.url} src={item.url} alt={`${i} Slide`}/>
                            ))}
                    </Carousel>
                </div>
            </div>
        </Fragment>
     );
}

export default withStyles(styles)(ProductDetails);