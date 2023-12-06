import { useState } from "react"


export const useGetSingleProduct = (productid) => {
    const [product, setProduct] = useState(null);

    fetch(`http://localhost:3000/ecommerce/product/${productid}`)
        .then(response => response.json())
        .then((data) => {
            setProduct(data)
        })
        .catch(err => setProduct(("error")))

    return {product, setProduct}
}