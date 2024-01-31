import React, { useState } from 'react';

const SearchTodo = ({ searchHandler }) => {

  const [inputValue, setInputValue] = useState('');

  const inputValueChangeHandler = (e) => {
    setInputValue(e.target.value);
  }

  return (
    <div className='search_container'>
      <input className='search-todo' placeholder='Type here for search...' onChange={inputValueChangeHandler} />
      <button className='search-btn' onClick={() => searchHandler(inputValue)}>Search</button>
    </div>
  )
}

export default SearchTodo;