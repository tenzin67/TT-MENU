import { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Landing from './pages/landing'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/' element={<Landing/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
