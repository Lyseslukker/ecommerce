import React from "react"
import {Route, Routes} from "react-router-dom"
import './App.css'

function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<NavigationTop />}>
              <Route index element={<Home />} />
              <Route path="Products" element={<Products />} />
              <Route path="About" element={<About />} />
              <Route path="Details/:id" element={<Details />} />
          </Route>
      </Routes>
    </>
  )
}

export default App
