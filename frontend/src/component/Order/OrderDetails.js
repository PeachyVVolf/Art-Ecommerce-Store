import React, { Fragment, useEffect } from 'react';
import './OrderDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData';
import { Link, useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { getOrderDetails, clearErrors } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';

const OrderDetails = () => {

    const { order, error, loading } = useSelector(state => state.OrderDetails);
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(params.id));
    }, [dispatch, alert, error, params.id]);

    return (
        <Fragment>
            <MetaData title="Order Details"/>
            {loading ? (
                <Loader/>
            ):(
                <div className='orderDetailsPage'>
                    <div className=''></div>
                </div>
            )}
        </Fragment>
    );
};

export default OrderDetails;