import React from 'react';
import { useState } from 'react';

const PostForm = ({ addPost, setAddPost }) => {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && body) {
      addPost(title, body);
      setTitle('');
      setBody('');
      setAddPost(false);
    }
  };

  return (
    <div className='PostFormBorder'>
      <form onSubmit={handleSubmit} className="PostForm">
        <p>Add Post</p>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title...' />
        <input type="text" value={body} onChange={(e) => setBody(e.target.value)} placeholder='Body...' />
        <div className='PostForm-btns'>
          <button type="button" className='closeAddPost-btn' onClick={() => setAddPost(false)}>Closs</button>
          <button type="submit" className='addPost-btn'>Add Post</button>
        </div>
      </form>
    </div>
  )
}

export default PostForm;