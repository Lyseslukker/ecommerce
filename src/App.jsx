import React from "react"
import {Route, Routes} from "react-router-dom"
import './App.css'
import Navigation from "./Components/Navigation/Navigation"
import Home from "./Pages/Home/Home"
import Products from "./Pages/Products/Products"
import Productdetail from "./Pages/Productdetail/Productdetail"
import Cart from "./Pages/Cart/Cart"
import Checkout from "./Pages/Checkout/Checkout"
import Payment from "./Pages/Payment/Payment"
import Search from "./Pages/Search/Search"
import Shipping from "./Pages/Shipping/Shipping"
import About from "./Pages/About/About"

import Admin from "./Pages/Admin/Admin"

import Errorpage from "./Pages/Errorpage/Errorpage"
import Loadingpage from "./Pages/Loadingpage/Loadingpage"


function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<Navigation />}>
              <Route index element={<Home />} />
              <Route path="Products" element={<Products />} />
              <Route path="Productdetail/:id" element={<Productdetail />} />
              <Route path="Cart" element={<Cart />} />
              <Route path="Checkout" element={<Checkout />} />
              <Route path="Payment" element={<Payment />} />
              <Route path="Search" element={<Search />} />
              <Route path="Shipping" element={<Shipping />} />
              <Route path="About" element={<About />} />
              <Route path="Admin" element={<Admin />} />
              <Route path="Errorpage" element={<Errorpage />} />
              <Route path="Loadingpage" element={<Loadingpage />} />
          </Route>
      </Routes>
    </>
  )
}

export default App