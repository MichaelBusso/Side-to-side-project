import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import Todo from './Todo';
import EditTodoForm from './EditTodoForm';
import TodoButtons from './TodoButtons';
import SearchTodo from './SearchTodo';
import './components style/TodoWrapper.css';

const TodoWrapper = () => {

  const [todos, setTodos] = useState([]);

  const userId = (JSON.parse(localStorage.getItem('activeUser')))[0].id;
  const header = { headers: { auth: JSON.parse(localStorage.getItem('activeUserHeaders')) } };
  const basicURL = 'http://localhost:4000/todos';
  
  const fetchTodos = async (URL) => {
    const { data } = await axios.get(URL, header);
    setTodos(data);
  }

  useEffect(() => {
    (async () => await fetchTodos(`${basicURL}/${userId}`))();
  }, [])

  const searchHandler = (inputValue) => {
    if (inputValue.length > 0) {
      fetchTodos(`${basicURL}/${userId}/search/${inputValue}`);
    }
  }

  const addTodo = async (todo) => {
    try {
      const { status, data } = await axios.post(`${basicURL}/${userId}`, { userId: userId, title: todo, completed: 0 }, header);
      if (status === 201) {
        setTodos([...todos, data]);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const toggleComplete = async (id) => {
    const myItem = todos.filter((item) => item.id === id);
    try {
      const { status, data } = await axios.put(`${basicURL}/${userId}/toggle-completed`, { todoId: id, completed: myItem[0].completed }, header);
      if (status === 200) {
        setTodos(todos.map(todo => todo.id === id ? data : todo));
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const addingFieldToObject = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: true } : todo));
  }

  const editTask = async (task, id) => {
    try {
      const { status, data } = await axios.put(`${basicURL}/${userId}/edit-title`, { todoId: id, title: task }, header);
      if (status === 200) {
        setTodos(removeFieldFromObjects(todos.map(todo => todo.id === id ? data : todo), 'isEditing'));
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

  const deleteTodo = async (id) => {
    try {
      const { status } = await axios.delete(`${basicURL}/${userId}/${id}`, header);
      if (status === 204) {
        setTodos(todos.filter(todo => todo.id !== id));
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='TodoWrapper'>
      <h1>Todos!</h1>
      <TodoForm
        addTodo={addTodo}
      />
      <div className='btns'>
        <TodoButtons fetchTodos={fetchTodos} userId={userId} />
      </div>
      <SearchTodo searchHandler={searchHandler} />
      {todos.map((todo, index) => (
        todo.isEditing ? (
          <EditTodoForm
            editTodo={editTask}
            task={todo}
            key={index}
          />
        ) : (
          <Todo
            task={todo}
            key={index}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={addingFieldToObject}
          />
        )
      ))}
    </div>
  )
}

export default TodoWrapper;