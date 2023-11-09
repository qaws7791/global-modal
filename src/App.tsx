import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { About, Home } from './pages'
import Layout from './pages/Layout'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
