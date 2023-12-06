import React, {useEffect, useState} from 'react'
import "./Productdetail.css"
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { useCookie } from '../../customHooks/Cookiecutter';
import { getCookieProducts, setCookieProducts, useCounter } from '../../customHooks/CookieController';
import { useUser } from '../../UserContext';
import {AiFillCheckCircle} from "react-icons/ai"
import {IoArrowBackCircleSharp} from "react-icons/io5"
import LoadingScreen from '../../Components/Loading/LoadingScreen';

export default function Productdetail() {


    const {user, setUser} = useUser()
    const navigate = useNavigate()

    const {id} = useParams()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [product, setProduct] = useState(null)
    const [bought, setBought] = useState(false);

    useEffect(() => {
        console.log(user)
        fetch(`http://localhost:3000/ecommerce/product/${id}`)
            .then(response => response.json())
            .then((data) => {
                // console.log(data)
                setProduct(data)
                setLoading(false)
            })
            .catch(err => setError(err))
    }, [])


    const addToCartHandler = () => {
        setCookieProducts(1, id)
        setUser(() => getCookieProducts())
        setBought(true)
        setTimeout(() => {
            setBought(false)
        }, 1000)
    }


    if (error) {
        return (
            <div className="productdetail">
                <h1>Fejl på siden</h1>
                <p>Forklaring: {error}</p>
            </div>
        )
    }

    if (loading) {
        return <LoadingScreen />
    }

    console.log(product)
    return (
        <div className='productdetail'>
            <div className="productdetail__product">
                <div className="product__imgWrapper" style={{backgroundImage: `url(http://localhost:3000/ecommerce/image/${product.imageRef})`}}>
                    <div className="imgWrapper__back" onClick={() => navigate(-1)}>
                        <IoArrowBackCircleSharp className='back__icon' />
                    </div>
                    {/* IMAGE */}
                </div>
                <div className="product__detailsWrapper">
                    <h1 className='detailsWrapper__title'>{product.title}</h1>
                    <p className='detailsWrapper__price'>Pris: {product.price} DKK</p>
                    <p className='detailsWrapper__description'>Beskrivelse: {product.description}</p>
                    <div className="productdetail__buy">
                        <button onClick={addToCartHandler} className="buy__button">
                            {bought ? <p className='button__check'><AiFillCheckCircle  className='check__icon'/></p> : <p className='button__add'>Tilføj til kurv</p>}
                        </button>
                    </div>
                </div>
            </div>

            
        </div>
    )
}