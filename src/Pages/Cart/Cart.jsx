import React, {useState, useEffect} from 'react'
import "./Cart.css"
import { useUser } from '../../UserContext'
import {transformCart, cartTotal} from '../../customHooks/CartController'
import LoadingScreen from '../../Components/Loading/LoadingScreen'
import Product from '../../Components/Cart/Product'
import { Link } from 'react-router-dom'


export default function Cart() {

    const {user, setUser} = useUser()
    const [cart, setCart] = useState("loading")
    const [total, setTotal] = useState(false);
    
    useEffect(() => {
        console.log(user)
        console.log(cart)
        // console.log(cart.length)
        // console.log(total)
        if (cart.length > 0) {
            transformCart().then(data => setCart(data))
            cartTotal().then(data => setTotal(data))
        }
        if (cart.length === 0) {
            
        }
    }, [user]);


    if (cart === "loading") {
        return <LoadingScreen />
    }
    if (cart.length < 1) {
        return (
            <div className="cart">
                <h1>Kurv</h1>

                <p>Du har ingen varer i kurven</p>
            </div>
        )
    }
    if (cart.length > 0) {
        return (
            <div className="cart">
                <h1>Kurv</h1>

                <div className="cart__userCartProducts">
                    {cart.map((product) => {
                        return (
                            <Product key={product.id} productData={product} />
                        )
                    })}
                </div>
                <div className="cart__total">
                    <p><b>Total</b>: {total ? total.toFixed(2) : 0} kr.</p>
                    <Link to="/checkout">Gå til kassen</Link>
                </div>
            </div>
        )
    }

    return (
        <div className='cart'>
            <h1>Kurv</h1>
        </div>
    )
}