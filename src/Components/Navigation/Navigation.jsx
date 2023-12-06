import React, {useState, useEffect} from 'react'
import { Outlet, Link } from "react-router-dom"
import "./Navigation.css"
import {HiOutlineSquares2X2} from "react-icons/hi2"
import {HiOutlineShoppingCart} from "react-icons/hi"
import {ImLeaf, ImCancelCircle} from "react-icons/im"
import {AiOutlineUser} from "react-icons/ai"
import Cookies from "js-cookie"
import { getCookieProducts } from '../../customHooks/CookieController'
import { useUser } from '../../UserContext'

export default function Navigation() {

    const {user, setUser} = useUser()
    const [cartCount, setCartCount] = useState(0);
    const [contentView, setContentView] = useState();
    

    const [mobileToggle, setMobileToggle] = useState(false);

    const mobileNavigationHandler = (e) => {
        if (mobileToggle === false) {
            setMobileToggle(true)
        }
        if (mobileToggle === true) {
            setMobileToggle(false)
        }
    }

    const resizeHandler = () => {
        console.log(contentView)
        if (window.innerWidth < 768) {
            setContentView("mobile")
        }
        if (window.innerWidth >= 768 && window.innerWidth < 1024) {
            setContentView("tablet")
        }
        if (window.innerWidth >= 1024) {
            setContentView("desktop")
        }
    }

    useEffect(() => {
        window.addEventListener("resize", resizeHandler)
        resizeHandler()
        console.log(contentView)
        const totalAmount = user.reduce((total, product) => {
            return total + product.amount
        }, 0)
        setCartCount(totalAmount)

        // console.log(totalAmount)
    }, [user]);


    if (contentView === "mobile") {
        return (
            <div className='app_light'>
                <div className={mobileToggle ? "mobile_navigation_show" : "mobile_navigation_hidden"}>
                    <nav className='navigation'>
                        <Link onClick={mobileNavigationHandler}><ImCancelCircle style={{color: "#FF7171"}} /></Link>
                        <Link></Link>
                        <Link to="/login" onClick={mobileNavigationHandler}><AiOutlineUser style={{color: "var(--main-color)"}} /></Link>
                    </nav>
                    <div className="navBody">
                        <Link>Privacy-policy</Link>
                        <Link>Handelsbetingelser</Link>
                        <Link>Reklamation & Retur</Link>
                        <Link>Fragtpriser</Link>
                        <Link>Levering</Link>
                        <Link to="/login" onClick={mobileNavigationHandler}>Employees</Link>
                    </div>
                </div>
                <nav className='navigation'>
                    <Link onClick={mobileNavigationHandler}><HiOutlineSquares2X2 /></Link>
                    <Link to="/"><ImLeaf /></Link>
                    <Link to="/Cart"><HiOutlineShoppingCart /><p className='navigation__cartCount'>{cartCount ? cartCount : 0}</p></Link>
                </nav>
    
    
                <Outlet />
            </div>
        )
    }
    if (contentView === "tablet") {
        return (
            <div className='app_light'>
                <div className={mobileToggle ? "mobile_navigation_show" : "mobile_navigation_hidden"}>
                    <nav className='navigation'>
                        <Link onClick={mobileNavigationHandler}><ImCancelCircle style={{color: "#FF7171"}} /></Link>
                        <Link></Link>
                        <Link to="/login" onClick={mobileNavigationHandler}><AiOutlineUser style={{color: "var(--main-color)"}} /></Link>
                    </nav>
                    <div className="navBody">
                        <Link>Privacy-policy</Link>
                        <Link>Handelsbetingelser</Link>
                        <Link>Reklamation & Retur</Link>
                        <Link>Fragtpriser</Link>
                        <Link>Levering</Link>
                        <Link to="/login" onClick={mobileNavigationHandler}>Employees</Link>
                    </div>
                </div>
                <nav className='navigation'>
                    <Link onClick={mobileNavigationHandler}><HiOutlineSquares2X2 /></Link>
                    <Link to="/"><ImLeaf /></Link>
                    <Link to="/Cart"><HiOutlineShoppingCart /><p className='navigation__cartCount'>{cartCount ? cartCount : 0}</p></Link>
                </nav>
    
    
                <Outlet />
            </div>
        )
    }
    if (contentView === "desktop") {
        return (
            <div className='app_light'>
                <nav className='navigation'>
                    <Link to="/login"><AiOutlineUser style={{color: "var(--main-color)"}} /></Link>
                    <Link to="/"><ImLeaf /></Link>
                    <Link to="/Cart"><HiOutlineShoppingCart /><p className='navigation__cartCount'>{cartCount ? cartCount : 0}</p></Link>
                </nav>
    
                <Outlet />
            </div>
        )
    }

    // return (
    //     <div className='app_light'>
    //         <div className={mobileToggle ? "mobile_navigation_show" : "mobile_navigation_hidden"}>
    //             <nav className='navigation'>
    //                 <Link onClick={mobileNavigationHandler}><ImCancelCircle style={{color: "#FF7171"}} /></Link>
    //                 <Link></Link>
    //                 <Link to="/login" onClick={mobileNavigationHandler}><AiOutlineUser style={{color: "var(--main-color)"}} /></Link>
    //             </nav>
    //             <div className="navBody">
    //                 <Link>Privacy-policy</Link>
    //                 <Link>Handelsbetingelser</Link>
    //                 <Link>Reklamation & Retur</Link>
    //                 <Link>Fragtpriser</Link>
    //                 <Link>Levering</Link>
    //                 <Link to="Adminlogin" onClick={mobileNavigationHandler}>Employees</Link>
    //             </div>
    //         </div>
    //         <nav className='navigation'>
    //             <Link onClick={mobileNavigationHandler}><HiOutlineSquares2X2 /></Link>
    //             <Link to="/"><ImLeaf /></Link>
    //             <Link to="/Cart"><HiOutlineShoppingCart /><p className='navigation__cartCount'>{cartCount ? cartCount : 0}</p></Link>
    //         </nav>


    //         <Outlet />
    //     </div>
    // )
}