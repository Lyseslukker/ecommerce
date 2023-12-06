import React, {createContext, useState, useContext, useEffect} from "react"
import { getCookieProducts, updateCookie } from "./customHooks/CookieController";
import Cookies from "js-cookie"


// Create Context
const UserContext = createContext()

// Export Provider
export const UserProvider = ({children}) => {
    const [user, setUser] = useState(getCookieProducts())

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
};

// Export useUser
export const useUser = () => {
    const context = useContext(UserContext)
    return context
}


export const increment = (id) => {
    const currentCookie = getCookieProducts()
    const tempMap = currentCookie.map((product) => {
        if (product.id === id) {
            return {
                ...product,
                amount: product.amount + 1
            }
        }
        return product
    })
    updateCookie(tempMap)
    return tempMap
}

export const decrement = (id) => {
    const currentCookie = getCookieProducts()
    const [product] = currentCookie.filter((product) => {
        return product.id === id
    })
    if (product.amount === 1) {
        const updated = currentCookie.filter((product) => {
            return product.id !== id
        })
        updateCookie(updated)
        return updated
    }
    if (product.amount > 1) {
        const updated = currentCookie.map((product) => {
            if (product.id === id) {
                return {
                    ...product,
                    amount: product.amount - 1
                }
            }
            else {
                return product
            }
        })
        updateCookie(updated)
        return updated
    }
}

export const custom = (amount, id) => {
    const currentCookie = getCookieProducts()
    const amountNumber = Number(amount)

    if (amountNumber < 1) {
        const updated = currentCookie.filter((product) => {
            return product.id !== id
        })
        updateCookie(updated)
        return updated
    }
    if (amountNumber > 0) {
        const updated = currentCookie.map((product) => {
            if (product.id === id) {
                return {
                    ...product,
                    amount: amountNumber
                }
            }
            else {
                return product
            }
        })
        updateCookie(updated)
        return updated
    }
    
}

export const remove = (id) => {
    const currentCookie = getCookieProducts()
    const updated = currentCookie.filter((product) => {
        return product.id !== id
    })
    updateCookie(updated)
    return updated
}