import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import './Products.css';
import MetaData from '../layout/MetaData';
import { clearErrors, getProduct} from '../../actions/productAction';
import {useSelector, useDispatch} from "react-redux";
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { useAlert } from 'react-alert';
import { Slider, Typography } from '@material-ui/core';

const categories = [
    "Portrait",
    "Line Art",
    "Painting",
    "Sketch",
    "Still Art"
];

const Products = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 100000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const {products, loading, error, productsCount, resultPerPage, 
        filteredProductsCount} = useSelector(state=>state.products);
    // TODO: Not fetching productsCount and resultsPerPage
    const params = useParams();
    const keyword = params.keyword;

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    useLayoutEffect(() => {
        getProduct(keyword, currentPage)
    })

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

    let count = filteredProductsCount;

  return (
    <Fragment>
        {loading ? <Loader /> :
        <Fragment>
            <MetaData title="Products -- Artyft" />
            <h2 className='productsHeading'>Products</h2>
            <br/><br/><br/>
            <div className='products'>
                {products && 
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
            </div>

            <div className='filterBox'>
                <Typography>Price</Typography>
                <Slider 
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby='range-slider'
                    min={0}
                    max={100000}

                />

                <Typography>Category</Typography>
                <ul className='categoryBox'>
                    {categories.map((category) => (
                        <li 
                            className='category-link' 
                            key={category}
                            onClick={() => setCategory(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>

                <fieldset>
                    <Typography component="legend">Ratings</Typography>
                    <Slider 
                        value={ratings}
                        onChange={(e, newRating) => {
                            setRatings(newRating);
                        }}
                        aria-labelledby='continuous-slider'
                        valueLabelDisplay='auto'
                        min={0}
                        max={5}
                    />
                </fieldset>
            </div>

            {/* TODO: Fix when can fetch */}
            {/* {resultPerPage < count && ( */}
                <div className='paginationBox'>
                    <Pagination 
                        activePage={currentPage}
                        itemsCountPerPage={6}
                        totalItemsCount={8}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass='pageItemActive'
                        activeLinkClass='pageLinkActive'
                    />
                </div>
            {/* )} */}
        </Fragment>
        }
    </Fragment>
  )
}

export default Products;