import React, { useState } from 'react';

const CommentForm = ({ addComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && body) {
      addComment(name, email, body);
      setName('');
      setEmail('');
      setBody('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="CommentForm">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="name-input" placeholder='Name...' />
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="email-input" placeholder='Email...' />
      <input type="text" value={body} onChange={(e) => setBody(e.target.value)} className="comment-input" placeholder='New comment...' />
      <button type="submit" className='comment-btn'>Add Comment</button>
    </form>
  )
}

export default CommentForm;