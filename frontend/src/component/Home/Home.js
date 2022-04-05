import React, { Fragment, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './homeStyles';
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData';
import {clearErrors, getProduct} from '../../actions/productAction';
import {useSelector, useDispatch} from "react-redux";
import Loader from '../layout/Loader/Loader';
import {useAlert} from "react-alert";

const Home = ({classes}) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading, error, products} = useSelector(state=>state.products)

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors())
;        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    return ( 
        <Fragment>
            {loading ? <Loader />: 
                <Fragment>
                <MetaData title="Artyft" />
                <div className={classes.banner}>
                    <p>Welcome to Artyft</p>
                    <h1>Pakistan's First NFT Marketplace.</h1>

                    <a href='#featuredContainer'>
                        <button>
                            Discover NFTs
                        </button>
                    </a>
                </div>
                <h2 className={classes.homeHeading}>Featured NFTs</h2>
                <div className={classes.container} id='featuredContainer'>
                    {products && products.map(product=>(
                        <ProductCard key={product._id} product={product} />
                    ) )}
                </div>
            </Fragment>
            }
        </Fragment>
     );
};

export default withStyles(styles)(Home);