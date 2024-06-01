import React from 'react'

const Todo = (props) => {
  return (
      <div className='todo' style={{cursor: 'pointer'}}>
        <div className='title-handler' onClick={props.toggleComplete}>
          <h4 style={{textDecoration: props.todo.complete ? 'line-through': '', background: 'transparent'}} >{props.todo.text}</h4>
        </div>
        <button className='delete-btn' onClick={props.onDelete} >X</button>
      </div>
  )
}

export default Todo