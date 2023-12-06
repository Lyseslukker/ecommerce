import React, {useState, useEffect} from 'react'
import "./Userpage.css"

export default function Userpage() {

    const [userPurchases, setUserPurchases] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/ecommerce/userPurchases")
            .then(response => response.json())
            .then(data => setUserPurchases(data))
            .catch(err => console.log(err))
    }, []);


    return (
        <div className='userpage'>
            <h1>Userpage</h1>

            {userProducts.map((userpurchase) => {
                return (
                    <div className="userpage__purchase">
                        
                    </div>
                )
            })}
        </div>
    )
}