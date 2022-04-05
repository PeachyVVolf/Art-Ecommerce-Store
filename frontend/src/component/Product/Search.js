import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import MetaData from '../layout/MetaData';

const Search = () => {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        console.log(keyword)
        if(keyword.trim()){ 
            navigate(`/products/${keyword}`)
        }else{
            navigate("/products")
        }
    }

  return (
      <Fragment>
          <MetaData title="Search -- Artyft" />
          <form className='searchBox' onSubmit={searchSubmitHandler}>
            <input 
                type='text'
                placeholder='Search Product...'
                onChange={(e) => setKeyword(e.target.value)}
            />
            <input type='submit' value='Search'/>
          </form>
      </Fragment>
  )
}

export default Search;