import React, {useState} from 'react'
import "./Product.css"
import { Link } from 'react-router-dom'
import { setCookieProducts, getCookieProducts } from '../../customHooks/CookieController';
import { useUser } from '../../UserContext';
import { AiFillCheckCircle } from 'react-icons/ai';
import {FaShoppingBasket} from "react-icons/fa"

export default function Product({product}) {

    const {user, setUser} = useUser()
    const [bought, setBought] = useState(false);


    const quickBuy = (e) => {
        e.preventDefault()
        const productid = e.currentTarget.dataset.productid
        console.log(productid)

        setCookieProducts(1, productid)
        setUser(getCookieProducts)
        setBought(true)
        setTimeout(() => {
            setBought(false)
        }, 1000)
    }


    return (
        <Link to={`/productdetail/${product.id}`} className="homeProduct">
            <div className="product__imgWrapper" style={{backgroundImage: `url(http://localhost:3000/ecommerce/image/${product.imageRef})`}}>

            </div>
            {/* <img src={`http://localhost:3000/image/${product.imageRef}`} alt="" /> */}
            <div className="product__infoWrapper">
                <h4>{product.title}</h4>
                <p>{product.price} kr</p>
            </div>
            {
                bought ? <button><AiFillCheckCircle className='button__check' /></button> : <button data-productid={product.id} onClick={quickBuy}><FaShoppingBasket className='button__basket' /></button>
            }
        </Link>
    )
}