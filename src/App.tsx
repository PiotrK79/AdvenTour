import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Setup from './pages/Setup'
import SwipeDeck from './pages/SwipeDeck'
import FinalPlan from './pages/FinalPlan'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/swipe" element={<SwipeDeck />} />
        <Route path="/final" element={<FinalPlan />} />
      </Routes>
    </Router>
  )
}

export default App
