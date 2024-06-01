import {React, useState} from 'react'
import shortid from 'shortid';

const TodoForm = (props) => {
  const [text, setText] = useState('');
  
  const handleSubmit = (e)=> {
    e.preventDefault();
    props.onSubmit({
      id: shortid.generate(),
      text: text,
      complete: false
    })
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
        <input type="text" className="input-field" placeholder="todo here..." value={text} onChange={(e)=> setText(e.target.value)}/>
        <button className="btn" type='submit'>add todo</button>
    </form>
  )
}

export default TodoForm