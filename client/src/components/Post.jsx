import React from 'react';
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import CommentWrapper from './CommentWrapper';

const Post = ({ post, userId, show, toggleShow, deletePost, editPost1 }) => {
  return (
    <div className="Post">
      <p className='title'>[ID: {post.id}]: {post.title}</p>
      <div className='post_body'>
        <p>{post.body}</p>
      </div>
      <div className='toggleComments'>See comments on this post</div>
      {!show ?
        <IoIosArrowDropdownCircle className='more_less' onClick={() => toggleShow(post.id)} /> :
        <IoIosArrowDropupCircle className='more_less' onClick={() => toggleShow(post.id)} />}
      {post.userId === userId &&
        <>
          <FontAwesomeIcon className="edit-icon-posts" icon={faPenToSquare} onClick={() => editPost1(post.id)} />
          <FontAwesomeIcon className="delete-icon-posts" icon={faTrash} onClick={() => deletePost(post.id)} />
        </>
      }
      {show &&
        <CommentWrapper post={post} />
      }
    </div>
  )
}

export default Post;