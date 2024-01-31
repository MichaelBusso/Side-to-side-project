import React, { useState } from 'react';

const SearchPost = ({ searchHandler }) => {

  const [selected, setSelected] = useState('');
  const [inputValue, setInputValue] = useState('');

  const selectChangeHandler = (e) => {
    setSelected(e.target.value);
  }

  const inputValueChangeHandler = (e) => {
    setInputValue(e.target.value);
  }

  return (
    <div className='search_container'>
      <input className='search-post' placeholder='Type here for search...' onChange={inputValueChangeHandler} />
      <select id='dropDown' value={selected} onChange={selectChangeHandler}>
        <option value='' disabled>Search by:</option>
        <option value='title'>Title</option>
        <option value='body'>Body</option>
      </select>
      <button className='search-btn' onClick={() => searchHandler(inputValue, selected)}>Search</button>
    </div>
  )
}

export default SearchPost;