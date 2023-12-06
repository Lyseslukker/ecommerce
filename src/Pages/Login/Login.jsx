import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../UserContext'
import "./Login.css"


export default function Adminlogin() {

    const navigate = useNavigate()

    const {user, setUser} = useUser()


    const [statusMessage, setStatusMessage] = useState(null);
    const [statusState, setStatusState] = useState(false);
    const [userEmail, setUserEmail] = useState(false);
    const [userPassword, setUserPassword] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/user", {
            credentials: "include"
        })
        .then(response => response.json())
        .then((data) => {
            console.log("Data: ", data)
            if (data.status === "Success") {
                navigate(data.data)
            }
            if (data.status === "Pending") {
                setStatusMessage(data.msg)
                setUserEmail(data.data)
                setStatusState(true)
            }
            if (data.status === "Failed") {
                setStatusMessage(data.msg)
                setStatusState(true)
            }
        })
        .catch(err => console.log(err))
    }, [])


    const loginHandler = (e) =>{
        setStatusState(false)
        e.preventDefault()
        // console.log(e.target.email.value)
        // console.log(e.target.password.value)

        const credentials = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        fetch("http://localhost:3000/user", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            credentials: 'include'
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            if (data.status === "Failed") {
                setStatusMessage(data.msg)
                setStatusState(true)
            }
            if (data.status === "Success") {
                navigate("/admin")
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }




    return (
        <div className='adminlogin'>
            <h1>Login</h1>

            <form onSubmit={loginHandler}>
                <label htmlFor="email">Email: </label>
                <input onChange={(e) => {setUserEmail(e.target.value)}} type="email" name="email" id="email" placeholder='Indtast email' value={userEmail ? userEmail : ''} />

                <label htmlFor="password">Password: </label>
                <input onChange={(e) => {setUserPassword(e.target.value)}} type="password" name="password" id="password" placeholder='Indtast password' value={userPassword ? userPassword : ''} />

                <div className="statusWrapper">
                    <p className={statusState ? "status__show" : "status__hide"}>{statusMessage}</p>
                </div>
            
                <button type="submit">Login</button>
            </form>
        </div>
    )
}