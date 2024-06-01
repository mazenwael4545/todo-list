import React, { useState } from 'react'
import TodoForm from './Components/TodoForm'
import Todo from './Components/Todo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
  let [todos, setTodos] = useState([]);
  const [todosToShow, setTodosToShow] = useState('all');
  const [toggleAllComplete, setToggleAllComplete] = useState(true);

  const addTodo = function(todo){
    setTodos([todo, ...todos])
  }

  const toggleComplete = function(id) {
    setTodos(
      todos.map(todo => {
        if(todo.id === id){
          return {
            ...todo,
            complete: !todo.complete
          }
        }else{
          return todo
        }
      })
    )
  }

  const handleDelete = (id)=> {
    setTodos(todos.filter((todo)=> todo.id !== id))
  }

  switch(todosToShow){
    case 'active': 
      todos = todos.filter(todo => !todo.complete);
      break;
    case 'complete': 
      todos = todos.filter(todo => todo.complete);
      break;
    default:
      break;
  }

  return (
    <Router>
      <Routes>
        <Route path='/todo-list' element={
          <div className="container">
            <TodoForm onSubmit={addTodo} />
            <div className='tabs'>
              <button onClick={()=> setTodosToShow('all')}>all</button>
              <button onClick={()=> setTodosToShow('active')}>active</button>
              <button onClick={()=> setTodosToShow('complete')}>complete</button>
            </div>
            <div className="todo-container">
              {todos.length === 0 ? (
                <h2 className='no-tasks'>no tasks yet</h2>
              ) : (
                todos.map((todo) => (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    onDelete={() => handleDelete(todo.id)}
                    toggleComplete={() => toggleComplete(todo.id)}
                  />
                ))
              )}
            </div>
            <div className="buttons">
              {todos.some(todo=> todo.complete) ? 
              (
                <button onClick={()=> setTodos(todos.filter(todo=> !todo.complete))}>
                  remove all complete todos
                </button>
              )
              : null}
              <button onClick={()=> {
                setToggleAllComplete(!toggleAllComplete);
                setTodos(
                  todos.map( todo => ({
                    ...todo,
                    complete: toggleAllComplete
                  }))
                )
              }}>toggle all complete {`${toggleAllComplete}`}</button>
            </div>
          </div>
        } />
        <Route path='/*' element={<h2>There is no route like that</h2>} />
      </Routes>
    </Router>
  )
}

export default App