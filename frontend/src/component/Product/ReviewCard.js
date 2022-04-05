import React from 'react';
import ReactStars from 'react-rating-stars-component';
import profilePng from '../../images/artyftLogo.jpeg';
import './productDetailsStyles.css';

const ReviewCard = ({review}) => {

    const options = {
        edit: false,
        color: "white",
        activeColor: "tomato",
        value: review.rating,
        isHalf: true,
        size: window.innerWidth < 700 ? 15: 20
    };

  return (
    <div className='reviewCard'>
        <img src={profilePng} alt='user'/>
        <p>{review.name}</p>
        <ReactStars {...options} />
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard;