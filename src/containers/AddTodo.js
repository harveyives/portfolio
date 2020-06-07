import {addTodo} from '../features/todos/todosSlice'
import React, {useState} from 'react'
import {connect} from 'react-redux'

const mapDispatch = {addTodo}

const AddTodo = ({addTodo}) => {
  const [todoText, setTodoText] = useState('')

  const onChange = e => setTodoText(e.target.value)
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!todoText.trim()) {
            return
          }
          addTodo(todoText)
          setTodoText('')
        }}
      >
        <input value={todoText} onChange={onChange}/>
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}

export default connect(null, mapDispatch)(AddTodo)
