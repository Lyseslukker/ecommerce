import React, {useState, useEffect} from 'react'
import LoadingScreen from '../../Components/Loading/LoadingScreen';
import "./Checkout.css"
import { Link, useNavigate } from 'react-router-dom'
import {setGuestInfo } from '../../customHooks/CookieController';


export default function Checkout() {

    const navigate = useNavigate()

    const formhandler = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value

        setGuestInfo(name, email)
        navigate("/shipping")
    }


    return (
        <div className='checkout'>
            <h1>Checkout</h1>

            <form onSubmit={formhandler}>
                <div className="email">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" />
                </div>

                <div className="name">
                    <label htmlFor="name">Fulde navn:</label>
                    <input type="text" name="name" id="name" />
                </div>

                <button type="submit">Videre til levering</button>
            </form>
        </div>
    )
}