import { getCookieProducts } from "./CookieController"

export const transformCart = () => {
    return new Promise((resolve, reject) => {
        const cartProducts = getCookieProducts()
    
        if (cartProducts.length < 1) {
            resolve(cartProducts)
        }
        else {
            Promise.all(
                cartProducts.map((product) => {
                    return fetch(`http://localhost:3000/ecommerce/product/${product.id}`)
                })
            )
            .then((responses) => Promise.all(responses.map(response => response.json())))
            .then((data) => {
                const updatedProducts = data.map((product) => {
                    const [cartProduct] = cartProducts.filter((cartProduct) => {
                        return cartProduct.id === product.id
                    })
                    return {
                        ...product,
                        amount: cartProduct.amount
                    }
                })
                resolve(updatedProducts)
            })
            .catch((err) => {
                console.log(err)
                reject([])
            })
    
        }
    })

}

export const getCart = async () => {
    const cartProducts = getCookieProducts()

    try {
        const responses = await Promise.all(
            cartProducts.map((product) => {
                return fetch(`http://localhost:3000/ecommerce/product/${product.id}`)
            })
        )
        const data = await Promise.all(responses.map(response => response.json()))

        const updatedProducts = data.map((product) => {
            const [cartProduct] = cartProducts.filter((cartProduct) => {
                return cartProduct.id === product.id
            })
            return {
                ...product,
                amount: cartProduct.amount
            }
        })

        return updatedProducts
    } 
    catch (error) {
        console.log(error)
    }
}


export const cartTotal = async () => {
    const cartProducts = await getCart()
    // console.log(cartProducts)
    if (cartProducts.length < 1) {
        return 0
    }
    else {
        const mappedIndividuelCost = cartProducts.map((product) => {
            return product.amount * product.price
        })
        const total = mappedIndividuelCost.reduce((cost, total) => {
            return cost += total
        })
    
        return total
    }
}