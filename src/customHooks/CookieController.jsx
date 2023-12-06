import { useState, useEffect } from "react";
import Cookies from "js-cookie"

export const useCounter = (initialValue) => {
    const [count, setCount] = useState(initialValue);

    const increment = () => {
        console.log("Incrementing", count)
        setCount((e) => e + 1)
    }
    const decrement = () => {
        console.log("decrementing", count)
        setCount((e) => e - 1)
    }
    const reset = () => setCount(0)

    return {count, increment, decrement, reset}
}

export const useCookie = () => {
    const [cookie, setCookie] = useState()
    
    useEffect(() => {
        const currentCookie = Cookies.get("cookieCart")

        if (currentCookie === undefined) {
            setCookie([])
        }
        else {
            const parsedCurrentCookie = JSON.parse(currentCookie)

            if (parsedCurrentCookie.length < 1) {
                setCookie([])
            }
            else {
                setCookie(parsedCurrentCookie)
            }
        }
    }, []);

    // INCREMENT PRODUCT by 1
    const updateCookie = (amount, newProductId) => {
        // If no products
        if (cookie.length < 1) {
            const tempCookie = [
                {
                    id: newProductId,
                    amount: amount
                }
            ]
            const stringedTempCookie = JSON.stringify(tempCookie)
            Cookies.set("cookieCart", stringedTempCookie)
            setCookie(tempCookie)
        }
        // If there is products in the cookie already
        else {
            const checkIfExistAlready = cookie.filter((product) => {
                return product.id === newProductId
            })
    
            if (checkIfExistAlready.length < 1) {
                const tempCookie = [
                    ...currentCookie,
                    {
                        id: newProductId,
                        amount: amount
                    }
                ]
                const stringedTempCookie = JSON.stringify(tempCookie)
                Cookies.set("cookieCart", stringedTempCookie)
                setCookie(tempCookie)
            }
            else {
                const tempCookie = currentCookie.map((product) => {
                    if (product.id === newProductId) {
                        return {
                            ...product,
                            amount: product.amount + amount
                        }
                    }
                    return product
                })
                const stringedTempCookie = JSON.stringify(tempCookie)
                Cookies.set("cookieCart", stringedTempCookie)
                setCookie(tempCookie)
            }
        }
    }

    return {cookie, updateCookie}
}

export const getUserCookie = () => {
    const currentUser = Cookies.get("user")
    
    if (!currentUser) {
        return "guest"
    }
    if (currentUser) {
        return currentUser
    }
}

export const getCookieProducts = () => {
    const currentCookie = Cookies.get("cookieProducts")

    if (currentCookie === undefined) {
        return []
    }
    else {
        const parsedCurrentCookie = JSON.parse(currentCookie)

        if (parsedCurrentCookie.length < 1) {
            return []
        }
        else {
            return parsedCurrentCookie
        }
    }
}


export const setCookieProducts = (amount, newProductId) => {
    const currentCookie = getCookieProducts()

    // If no products
    if (currentCookie.length < 1) {
        const tempCookie = [
            {
                id: newProductId,
                amount: amount
            }
        ]
        const stringedTempCookie = JSON.stringify(tempCookie)
        Cookies.set("cookieProducts", stringedTempCookie, {
            sameSite: 'Strict',
            expires: 1
        })
    }
    // If there is products in the cookie already
    else {
        const checkIfExistAlready = currentCookie.filter((product) => {
            return product.id === newProductId
        })

        if (checkIfExistAlready.length < 1) {
            const tempCookie = [
                ...currentCookie,
                {
                    id: newProductId,
                    amount: amount
                }
            ]
            const stringedTempCookie = JSON.stringify(tempCookie)
            Cookies.set("cookieProducts", stringedTempCookie, {
                sameSite: 'Strict',
                expires: 1
            })
        }
        else {
            const tempCookie = currentCookie.map((product) => {
                if (product.id === newProductId) {
                    return {
                        ...product,
                        amount: product.amount + amount
                    }
                }
                return product
            })
            const stringedTempCookie = JSON.stringify(tempCookie)
            Cookies.set("cookieProducts", stringedTempCookie, {
                sameSite: 'Strict',
                expires: 1
            })
        }
    }
}

// DELETE 
export const removeCookieProduct = () => {
    Cookies.set("cookieProducts", "", {expires: 0})
}
export const removeGuestInfo = () => {
    Cookies.set("cookieGuestInfo", "", {expires: 0})
}


export const updateCookie = (updatedCookie) => {
    const stringed = JSON.stringify(updatedCookie)
    Cookies.set("cookieProducts", stringed, {
        sameSite: 'Strict',
        expires: 1
    })
}


export const setGuestInfo = (fullNameGuest, emailGuest) => {
    const tempJSON = JSON.stringify({
        name: fullNameGuest,
        email: emailGuest
    })
    Cookies.set("cookieGuestInfo", tempJSON, {
        sameSite: 'Strict',
        expires: 1
    })
}
export const getGuestInfo = () => {
    const cookieGuestInfo = JSON.parse(Cookies.get("cookieGuestInfo"))
    return cookieGuestInfo
}