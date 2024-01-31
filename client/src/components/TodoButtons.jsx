import React from 'react';
import Button from './Button';

const TodoButtons = ({ fetchTodos, userId }) => {

  const buttons = [
    {
      function: () => fetchTodos(`http://localhost:4000/todos/${userId}/completed`),
      value: 'Done'
    },
    {
      function: () => fetchTodos(`http://localhost:4000/todos/${userId}/not-completed`),
      value: 'Not Done'
    },
    {
      function: () => fetchTodos(`http://localhost:4000/todos/${userId}`),
      value: 'Show All'
    }
  ]

  return (
    <div>
      {buttons.map((btn, index) => (
        <Button
          key={index}
          handler={btn.function}
          value={btn.value}
        />
      ))}
    </div>
  )
}

export default TodoButtons;