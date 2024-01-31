import React, { useState } from 'react';

const EditTodoForm = ({ editTodo, task }) => {

    const [value, setValue] = useState(task.title);

    const handleSubmit = (e) => {
        e.preventDefault();
        editTodo(value, task.id);
    };
    return (
        <form onSubmit={handleSubmit} className="EditTodoForm">
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='Update task' />
            <button type="submit" className='todo-btn'>Update</button>
        </form>
    )
}

export default EditTodoForm;