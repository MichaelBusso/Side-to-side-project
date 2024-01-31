import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Comment = ({ comment, showDelete, deleteComment }) => {
  return (
    <div className='Comment' >
      <p>{comment.body}</p>
      {showDelete && <div className="delete-icon-comments" onClick={() => deleteComment(comment.id)}>Delete Comment<FontAwesomeIcon icon={faTrash} /></div>}
    </div>
  )
}

export default Comment;