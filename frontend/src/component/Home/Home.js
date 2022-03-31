import React, { Fragment, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './homeStyles';
import Product from './Product';
import MetaData from '../layout/MetaData';
import {getProduct} from '../../actions/productAction';
import {useSelector, useDispatch} from "react-redux";

const product = {
    name: 'Monkey NFT',
    image: [{url:'https://th.bing.com/th/id/OIP.4yyCzSyBnCKjKKj2WVjRjAHaFi?pid=ImgDet&rs=1'}],
    price: 'Rs. 25000',
    _id: 'monkeyNFT',
};

const Home = ({classes}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        
    }, []);

    return ( 
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
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
            </div>
        </Fragment>
     );
};

export default withStyles(styles)(Home);