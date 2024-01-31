import React, { useState } from 'react';

const EditPostForm = ({ editPost, post }) => {

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && body) {
      editPost(post.id, title, body);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="EditPostForm">
      <p>Edit Post</p>
      <p className='title_body'>Title:</p>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="edit-post-input" placeholder='Update post title' />
      <p className='title_body'>Body:</p>
      <input type="text" value={body} onChange={(e) => setBody(e.target.value)} className="edit-post-input" placeholder='Update post body' />
      <div className='EditPostForm-btns'>
        <button type="submit" className='edit-post-btn'>Update</button>
      </div>
    </form>
  )
}

export default EditPostForm;