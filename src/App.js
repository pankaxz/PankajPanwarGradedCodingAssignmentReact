import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './components/Homepage'
import MovieData from './components/MovieData'

function App() {
  return (
    <div
      style={{
        display: 'block',
        backgroundColor: '#18191a',
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/:movieName" element={<MovieData />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
