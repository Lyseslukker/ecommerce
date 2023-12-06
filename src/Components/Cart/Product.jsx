import React, {useState, useEffect} from 'react'
import { useUser, increment, decrement, remove, custom } from '../../UserContext';
import "./Product.css"

export default function Product({productData}) {

    const {user, setUser} = useUser()
    const [updateCart, setUpdateCart] = useState(false);
    const [inputValue, setInputValue] = useState(productData.amount);


    useEffect(() => {
        setInputValue(productData.amount)
    }, [productData]);


    const inputHandler = (value) => {
        setUpdateCart(true)
        setInputValue(value)
    }

    const updateInput = () => {
        setUser(custom(inputValue, productData.id))
        setUpdateCart(false)
    }


    return (
        <div className='product'>
            <div className="product__imgWrapper" style={{backgroundImage: `url(http://localhost:3000/ecommerce/image/${productData.imageRef})`}}>
                {/* IMAGE */}
            </div>
            <div className="product__infoWrapper">
                <div className="infoWrapper__title">
                    <h3>{productData.title}</h3>
                    <p><i>{productData.price} kr. stk</i></p>
                    <p style={{fontWeight: "500"}}>{(productData.price * productData.amount).toFixed(2)} kr</p>
                </div>
                <div className="infoWrapper__buttons">
                    <div className="buttons__moreOrLess">
                        <button className='moreOrLess__decrement' onClick={() => setUser(decrement(productData.id))}>-</button>
                        <input className='moreOrLess__custom' type="number" value={inputValue} onChange={(e) => inputHandler(e.target.value)} />
                        <button className='moreOrLess__increment' onClick={() => setUser(increment(productData.id))}>+</button>
                    </div>
                    {updateCart ? <button className='buttons__update' onClick={updateInput}>Opdater kurv</button> : <button className='buttons__remove' onClick={() => {setUser(remove(productData.id))}}>Fjern produkt</button>}
                </div>
            </div>
        </div>
    )
}