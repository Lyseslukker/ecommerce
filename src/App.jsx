import React, {Suspense, lazy} from "react"
import {Route, Routes, useNavigate, Navigate} from "react-router-dom"
import './App.css'
// import Navigation from "./Components/Navigation/Navigation"
// import Home from "./Pages/Home/Home"
// import Products from "./Pages/Products/Products"
// import Productdetail from "./Pages/Productdetail/Productdetail"
// import Cart from "./Pages/Cart/Cart"
// import Checkout from "./Pages/Checkout/Checkout"
// import Payment from "./Pages/Payment/Payment"
// import Search from "./Pages/Search/Search"
// import Shipping from "./Pages/Shipping/Shipping"
// import About from "./Pages/About/About"
// import Thankyou from "./Pages/Thankyou/Thankyou"

// import Login from "./Pages/Login/Login"
// import Admin from "./Pages/Admin/Admin"
// import Userpage from "./Pages/Userpage/Userpage"

const Navigation = lazy(() => import('./Components/Navigation/Navigation'));
const Home = lazy(() => import('./Pages/Home/Home'));
const Products = lazy(() => import('./Pages/Products/Products'));
const Productdetail = lazy(() => import('./Pages/Productdetail/Productdetail'));
const Cart = lazy(() => import('./Pages/Cart/Cart'));
const Checkout = lazy(() => import('./Pages/Checkout/Checkout'));
const Payment = lazy(() => import('./Pages/Payment/Payment'));
const Search = lazy(() => import('./Pages/Search/Search'));
const Shipping = lazy(() => import('./Pages/Shipping/Shipping'));
const About = lazy(() => import('./Pages/About/About'));
const Thankyou = lazy(() => import('./Pages/Thankyou/Thankyou'));

const Login = lazy(() => import('./Pages/Login/Login'));
const Admin = lazy(() => import('./Pages/Admin/Admin'));
const Userpage = lazy(() => import('./Pages/Userpage/Userpage'));


import Errorpage from "./Pages/Errorpage/Errorpage"
import Loadingpage from "./Pages/Loadingpage/Loadingpage"

import { UserProvider } from "./UserContext"
import LoadingScreen from "./Components/Loading/LoadingScreen";


function App() {


  return (
    <>
      {/* <UserProvider> */}
      <Suspense fallback={<LoadingScreen />}>
      <UserProvider>
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="productdetail/:id" element={<Productdetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="shipping" element={<Shipping />} />
                <Route path="thankyou" element={<Thankyou />} />
                <Route path="payment" element={<Payment />} />
                <Route path="search" element={<Search />} />
                <Route path="about" element={<About />} />
                <Route path="login" element={<Login />} />
                <Route path="admin" element={<Admin />} />
                <Route path="user" element={<Userpage />} />
                <Route path="errorpage" element={<Errorpage />} />
                <Route path="loadingpage" element={<Loadingpage />} />
            </Route>
        </Routes>
      </UserProvider>
      </Suspense>
      {/* </UserProvider> */}
    </>
  )
}

export default App