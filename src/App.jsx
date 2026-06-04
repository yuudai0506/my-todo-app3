import { useState, useEffect } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import { addTodo, removeTodo, toggleCompleted, countCompleted } from './todoUtils'

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleAdd = (text) => {
    setTodos((prev) => addTodo(prev, text))
  }

  const handleDelete = (id) => {
    setTodos((prev) => removeTodo(prev, id))
  }

  const handleToggle = (id) => {
    setTodos((prev) => toggleCompleted(prev, id))
  }

  const completed = countCompleted(todos)

  return (
    <div>
      <h1>TODOアプリ</h1>
      <p>
        全{todos.length}件 / 完了{completed}件 / 未完了{todos.length - completed}件
      </p>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleDelete} onToggle={handleToggle} />
    </div>
  )
}

export default App
