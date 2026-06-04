export function addTodo(todos, text) {
  if (text.trim() === '') return todos
  const newTodo = { id: Date.now(), text, completed: false }
  return [...todos, newTodo]
}

export function removeTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id)
}

export function toggleCompleted(todos, id) {
  return todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
}

export function countCompleted(todos) {
  return todos.filter((todo) => todo.completed).length
}
