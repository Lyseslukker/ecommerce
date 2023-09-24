import React from 'react'
import "./Admin.css"

export default function Admin() {
    
    
    return (
        <div className='admin'>
            <h1>Login</h1>

            <form>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" placeholder='Indtast email' />

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" placeholder='Indtast password' />
            </form>
        </div>
    )
}