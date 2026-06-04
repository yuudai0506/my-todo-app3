import { useState, useEffect } from 'react'

function ApiSample() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
        if (!res.ok) throw new Error('通信失敗')
        const data = await res.json()
        setTodos(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTodos()
  }, [])

  if (loading) return <p>読み込み中…</p>
  if (error) return <p>エラー：{error}</p>

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.completed ? '✅' : '⬜'} {todo.title}
        </li>
      ))}
    </ul>
  )
}

export default ApiSample
