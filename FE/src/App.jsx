import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Detect from './pages/Detect'
import Protect from './pages/Protect'
import History from './pages/History'
import News from './pages/News'
import Watermark from './pages/Watermark'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/detect" element={<Layout><Detect /></Layout>} />
        <Route path="/protect" element={<Layout><Protect /></Layout>} />
        <Route path="/history" element={<Layout><History /></Layout>} />
        <Route path="/news" element={<Layout><News /></Layout>} />
        <Route path="/watermark" element={<Layout><Watermark /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
