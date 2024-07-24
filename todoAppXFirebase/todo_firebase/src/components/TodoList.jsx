import React from 'react'
import TodoItem from './TodoItem'

const TodoList = ({todos, setEdit, removeTodo}) => {
  return (
    <div className='bg-grey-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4 bg-white' >
            <ul>
              {todos.map((todo, index) =>(
                <TodoItem key={index} index={index} todo={todo} setEdit={setEdit} removeTodo={removeTodo}/>
              ))}
            </ul>
        
        </div>
  )
}

export default TodoList