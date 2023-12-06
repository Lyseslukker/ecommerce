import React from 'react'
import "./Thankyou.css"
import { getGuestInfo, removeCookieProduct, removeGuestInfo } from '../../customHooks/CookieController'
import { useNavigate } from 'react-router-dom'

export default function Thankyou() {

    const navigate = useNavigate()

    return (
        <div>
            <h1>Tak for dit køb</h1>

            <p>
                Følg pakken rejse her på siden ved at logge ind.
            </p>

            <button onClick={() => navigate("/login")}>Log ind</button>
        </div>
    )
}