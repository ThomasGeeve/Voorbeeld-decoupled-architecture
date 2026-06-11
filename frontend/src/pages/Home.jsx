import { useState, useEffect } from 'react'

const API_URL = '/api/todos'

function Home() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => { fetchTodos() }, [])

  async function fetchTodos() {
    const res = await fetch(API_URL)
    setTodos(await res.json())
  }

  async function addTodo() {
    if (!title.trim()) return
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    const todo = await res.json()
    setTodos([...todos, todo])
    setTitle('')
  }

  async function toggleTodo(todo) {
    await fetch(`${API_URL}/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...todo, isCompleted: !todo.isCompleted }),
    })
    fetchTodos()
  }

  async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    fetchTodos()
  }

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Todo App</h1>
      <p>Decoupled .NET + React voorbeeld</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="Nieuwe taak..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={addTodo} style={{ padding: '8px 16px' }}>Toevoegen</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 0', borderBottom: '1px solid #eee',
          }}>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleTodo(todo)}
            />
            <span style={{
              flex: 1,
              textDecoration: todo.isCompleted ? 'line-through' : 'none',
              color: todo.isCompleted ? '#999' : '#000',
            }}>
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={{
              background: '#e44', color: '#fff', border: 'none',
              padding: '4px 8px', cursor: 'pointer',
            }}>×</button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && <p style={{ color: '#999' }}>Nog geen taken. Voeg er een toe!</p>}
    </div>
  )
}

export default Home
