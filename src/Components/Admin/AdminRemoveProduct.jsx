import React, {useEffect, useState} from 'react'

export default function AdminRemoveProduct() {

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState(false);
    
    useEffect(() => {
        fetch("http://localhost:3000/ecommerce/allproducts", {
            credentials: "include"
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            setLoading(false)
            setProducts(data)
        })
        .catch(err => console.log(err))
    }, [loading]);

    const removeProductHandler = (productid) => {
        console.log(productid)

        const tempObject = {
            id: productid
        }

        fetch("http://localhost:3000/removeproduct", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(tempObject)
        })
        .then(response => response.json())
        .then(data => {
            setLoading(true)
            console.log(data)
            // setProducts(false)
        })
        .catch(err => console.log(err))
    }

    if (error) {
        return (
            <div className="admin__removeProduct">
                <h2>Something went wrong</h2>
            </div>
        )
    }
    if (loading) {
        return (
            <div className="admin__removeProduct">
                <h2>Loading...</h2>
            </div>
        )
    }
    
    return (
        <div className='admin__removeProduct'>
            <p>Fjern produkt component</p>

            <div className="removeProduct__productsWrapper">
                {products.map((product) => {
                    return (
                        <div key={product.id} className="productsWrapper__product" data-product={product.id}>
                            <img src={`http://localhost:3000/ecommerce/image/${product.imageRef}`} alt="" />
                            <p>Titel: {product.title}</p>
                            <p>Pris: {product.price}</p>
                            <p>Beskrivelse: {product.description}</p>

                            <button onClick={() => {removeProductHandler(product.id)}}>Fjern produkt</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}