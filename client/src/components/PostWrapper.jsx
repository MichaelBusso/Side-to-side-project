import React, { useState, useEffect } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from 'axios';
import Post from './Post';
import PostForm from './PostForm';
import EditPostForm from './EditPostForm';
import './components style/PostWrapper.css';
import PostButtons from './PostButtons';
import SearchPost from './SearchPost';

const PostsWrapper = () => {

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [addPostForm, setAddPostForm] = useState(false);

  const userId = (JSON.parse(localStorage.getItem('activeUser')))[0].id;
  const header = { headers: { auth: JSON.parse(localStorage.getItem('activeUserHeaders')) } };
  const basicURL = 'http://localhost:4000/posts';

  const fetchPosts = async (URL) => {
    const { data } = await axios.get(URL, header);
    setPosts(data);
    setAllPosts(data);
  }

  useEffect(() => {
    (async () => await fetchPosts(`${basicURL}/${userId}`))();
  }, [])

  const searchHandler = (inputValue, selected) => {
    if (selected === 'title' && inputValue.length > 0) {
      fetchPosts(`${basicURL}/${userId}/search/title?toSearch=${inputValue}`);
    }
    if (selected === 'body' && inputValue.length > 0) {
      fetchPosts(`${basicURL}/${userId}/search/body?toSearch=${inputValue}`);
    }
  }

  const toggleShow = (id) => {
    showComments.includes(id) ? setShowComments(showComments.filter((postId) => postId !== id)) : setShowComments([...showComments, id]);
  }

  const addPost = async (title, body) => {
    try {
      const { status, data } = await axios.post(`${basicURL}/${userId}`, { userId: userId, title: title, body: body }, header);
      if (status === 201) {
        setPosts([...posts, data]);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const addingFieldToObject = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, isEditing: true } : post));
  }

  const editPost = async (postId, title, body) => {
    try {
      const { status, data } = await axios.put(`${basicURL}/${userId}/edit-post`, { userId: userId, postId: postId, title: title, body: body }, header);
      if (status === 200) {
        setPosts(removeFieldFromObjects(posts.map(post => post.id === postId ? data : post), 'isEditing'));
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const removeFieldFromObjects = (array, fieldToRemove) => {
    return array.map((obj) => {
      const { [fieldToRemove]: removedField, ...newObj } = obj;
      return newObj;
    });
  }

  const deletePost = async (id) => {
    try {
      const { status } = await axios.delete(`${basicURL}/${userId}/?userId=${userId}&postId=${id}`, header);
      console.log(status);
      if (status === 204) {
        setPosts(posts.filter(post => !(post.id === id && post.userId === userId)));
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='PostWrapper'>
      <div className='header'>
        <h1>Posts</h1>
        <IoIosAddCircleOutline className='add-icon' onClick={() => setAddPostForm(!addPostForm)} />
      </div>
      <div className='btns'>
        <PostButtons fetchPosts={fetchPosts} setPosts={setPosts} allPosts={allPosts} userId={userId} />
      </div>
      <SearchPost searchHandler={searchHandler} />
      {posts.map((post, index) => (
        post.isEditing ? (
          <EditPostForm
            editPost={editPost}
            post={post}
            key={index}
          />
        ) : (
          <Post
            show={showComments.includes(post.id) ? true : false}
            userId={userId}
            post={post}
            key={index}
            toggleShow={toggleShow}
            deletePost={deletePost}
            editPost1={addingFieldToObject}
          />
        )
      ))}
      {addPostForm && <PostForm addPost={addPost} setAddPost={setAddPostForm} />}
    </div>
  )
}

export default PostsWrapper;