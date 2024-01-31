import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentWrapper = ({ post }) => {

  const [comments, setComments] = useState([]);

  const userId = (JSON.parse(localStorage.getItem('activeUser')))[0].id;
  const header = { headers: { auth: JSON.parse(localStorage.getItem('activeUserHeaders')) } };
  const basicURL = 'http://localhost:4000/posts/comments';

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await axios.get(`${basicURL}/${userId}/${post.id}`, header);
      setComments(data);
    }
    (async () => await fetchComments())();
  }, [])

  const addComment = async (name, email, body) => {
    try {
      const { status, data } = await axios.post(`${basicURL}/${userId}`, { userId: userId, postId: post.id, name: name, email: email, body: body }, header);
      if (status === 201) {
        setComments([...comments, data]);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const deleteComment = async (id) => {
    try {
      const { status } = await axios.delete(`${basicURL}/${userId}/?userId=${post.userId}&commentId=${id}`, header);
      if (status === 204) {
        setComments(comments.filter(comment => !(post.id === comment.postId)));
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='CommentWrapper'>
      {comments.map((comment, index) => (
        <Comment
          comment={comment}
          key={index}
          deleteComment={deleteComment}
          showDelete={comments.find(comment => (post.id === comment.postId && post.userId === userId)) ? true : false}
        />
      ))}
      <h4>Add a new comment:</h4>
      <CommentForm addComment={addComment} />
    </div>
  )
}

export default CommentWrapper;