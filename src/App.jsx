import React from "react"
import {Route, Routes} from "react-router-dom"
import './App.css'
import Home from "./Pages/Home/Home"
import Productdetail from "./Pages/Productdetail/Productdetail"
import About from "./Pages/About/About"

function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<NavigationTop />}>
              <Route index element={<Home />} />
              <Route path="Products" element={<Products />} />
              <Route path="About" element={<About />} />
              <Route path="Productdetail/:id" element={<Productdetail />} />
          </Route>
      </Routes>
    </>
  )
}

export default App
