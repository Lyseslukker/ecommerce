import React from 'react'
import { Outlet, Link } from "react-router-dom"
import "./Navigation.css"

export default function Navigation() {
    return (
        <div className='app'>
            <nav className='navigation'>
                <Link to="/">Home</Link>
                
            </nav>

            <Outlet />
        </div>
    )
}