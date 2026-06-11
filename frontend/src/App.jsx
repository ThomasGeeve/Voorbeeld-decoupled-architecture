import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  const linkStyle = {
    textDecoration: 'none',
    color: '#555',
    fontWeight: 600,
    padding: '8px 16px',
    borderRadius: 4,
  }

  const activeStyle = {
    ...linkStyle,
    color: '#fff',
    background: '#4a90d9',
  }

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <nav style={{
        background: '#fff',
        borderBottom: '2px solid #e0e0e0',
        padding: '12px 24px',
        display: 'flex',
        gap: 8,
        alignItems: 'center',
      }}>
        <span style={{ fontWeight: 'bold', fontSize: 18, marginRight: 16, color: '#333' }}>
          Decoupled App
        </span>
        <NavLink to="/" end style={({ isActive }) => isActive ? activeStyle : linkStyle}>Home</NavLink>
        <NavLink to="/about" style={({ isActive }) => isActive ? activeStyle : linkStyle}>Over</NavLink>
        <NavLink to="/contact" style={({ isActive }) => isActive ? activeStyle : linkStyle}>Contact</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
