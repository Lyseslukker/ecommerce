import React, {useEffect, useState} from 'react'
import "./Home.css"
import { useUser } from '../../UserContext'
import { Link } from 'react-router-dom'
import LoadingScreen from '../../Components/Loading/LoadingScreen'
import Product from '../../Components/Product/Product'


export default function Home() {
    const {user, setUser} = useUser()

    const [greeting, setGreeting] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState(false);
    const [productsReversed, setProductsReversed] = useState(false);

    const currentTime = new Date()
    const timeHour = currentTime.getHours()
    // console.log(timeHour)
    
    
    useEffect(() => {
        // setUser({user: "Mike", password: "123456"})
        if (timeHour >= 18) {
            setGreeting("Godaften")
        } else if (timeHour >= 12) {
            setGreeting("God eftermiddag")
        } else if (timeHour >= 9) {
            setGreeting("God formiddag")
        } else if (timeHour >= 5) {
            setGreeting("Godmorgen")
        } else {
            setGreeting("Godaften")
        }
        console.log(user)
        fetch("http://localhost:3000/ecommerce/allproducts")
            .then(response => response.json())
            .then((data) => {
                const testRev = data.map((data) => data)
                // console.log(data)
                setProducts(data)
                setProductsReversed(testRev.reverse())
                setLoading(false)
                // console.log(products)
                // console.log(productsReversed)
            })
            .catch(err => console.log(err))
    }, []);


    if (error) {
        return (
            <div className="home">
                <h1>Error..</h1>
            </div>
        )
    }
    if (loading) {
        return <LoadingScreen />
    }

    return (
        <div className='home'>
            <h1>{greeting}</h1>

            <div className="home__trendingWrapper">
                {productsReversed.map((product) => {
                    return (
                        <Product key={product.id} product={product} />
                    )
                })}
            </div>
        </div>
    )
}