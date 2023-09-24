import React, {useState} from 'react'
import { Outlet, Link } from "react-router-dom"
import "./Navigation.css"
import {HiOutlineSquares2X2} from "react-icons/hi2"
import {HiOutlineShoppingCart} from "react-icons/hi"
import {ImLeaf, ImCancelCircle} from "react-icons/im"
import {AiOutlineUser} from "react-icons/ai"


export default function Navigation() {

    const [mobileToggle, setMobileToggle] = useState(false);

    const mobileNavigationHandler = (e) => {
        if (mobileToggle === false) {
            setMobileToggle(true)
        }
        if (mobileToggle === true) {
            setMobileToggle(false)
        }
    }


    return (
        <div className='app_light'>
            <div className={mobileToggle ? "mobile_navigation_show" : "mobile_navigation_hidden"}>
                <nav className='navigation'>
                    <Link onClick={mobileNavigationHandler}><ImCancelCircle style={{color: "#FF7171"}} /></Link>
                    <Link></Link>
                    <Link to="/Admin" onClick={mobileNavigationHandler}><AiOutlineUser style={{color: "var(--main-color)"}} /></Link>
                </nav>
                <Link><HiOutlineSquares2X2 /></Link>
                <Link><HiOutlineSquares2X2 /></Link>
                <Link><HiOutlineSquares2X2 /></Link>
                <Link><HiOutlineSquares2X2 /></Link>
                <Link><HiOutlineSquares2X2 /></Link>
            </div>
            <nav className='navigation'>
                <Link onClick={mobileNavigationHandler}><HiOutlineSquares2X2 /></Link>
                <Link to="/"><ImLeaf /></Link>
                <Link to="/Cart"><HiOutlineShoppingCart /></Link>
            </nav>


            <Outlet />
        </div>
    )
}