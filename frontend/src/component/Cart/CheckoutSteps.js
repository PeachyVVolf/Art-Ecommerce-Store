import { Typography, StepLabel, Step, Stepper } from '@material-ui/core';
import React, { Fragment } from 'react'
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import './CheckoutSteps.css';

const CheckoutSteps = ({ activeStep }) => {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon/>
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon/>
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon/>
        },
    ];

    const stepStyles = {
        boxSizing: "border-box",
        backgroundColor: "black"
    };

    return (
        <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles} >
                {steps.map((item, index) => (
                    <Step key={index} active={activeStep === index ? true : false} 
                        completed={activeStep >= index ? true : false}>
                        <StepLabel icon={item.icon} style={{
                            color: activeStep >= index ? "#AD0E82" : "rgba(255, 255, 255, 0.603)"
                        }}>
                            <p style={{
                                color: activeStep >= index ? "#AD0E82" : "rgba(255, 255, 255, 0.603)"
                            }}>
                                {item.label}
                            </p>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Fragment>
    )
}

export default CheckoutSteps