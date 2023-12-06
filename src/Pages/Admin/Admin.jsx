import React, {useEffect, useState} from 'react'
import "./Admin.css"
import AdminAddProduct from '../../Components/Admin/AdminAddProduct';
import AdminRemoveProduct from '../../Components/Admin/AdminRemoveProduct';
import AdminOrders from '../../Components/Admin/AdminOrders';
import { useNavigate } from 'react-router-dom';
// import { checkUser } from '../../customHooks/checkUser';
import Cookies from "js-cookie"

export default function Admin() {

    const navigate = useNavigate()


    useEffect(() => {
        fetch("http://localhost:3000/ecommerce/userCheck", {
            credentials: "include"
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            navigate(data.data)
        })
        .catch(err => navigate("/login"))
    }, []);


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [addProduct, setAddProduct] = useState(true);
    const [removeProduct, setRemoveProduct] = useState(false);
    const [orders, setOrders] = useState(false);

    const addProductStateHandler = () => {
        setAddProduct(true)
        setRemoveProduct(false)
        setOrders(false)
    }
    const removeProductStateHandler = () => {
        setAddProduct(false)
        setRemoveProduct(true)
        setOrders(false)
    }
    const ordersStateHandler = () => {
        setAddProduct(false)
        setRemoveProduct(false)
        setOrders(true)
    }


    const adminPanel = (
        <div className="admin__panel">
            <button className='panel__add' onClick={addProductStateHandler}>Tilføj produkt</button>
            <button className='panel__remove' onClick={removeProductStateHandler}>Fjern produkt</button>
            <button className='panel__order' onClick={ordersStateHandler}>Administrer ordre</button>
        </div>
    )


    

    if (error) {
        return (
            <div className="admin">
                <h1>Something went wrong</h1>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="admin">
                <h1>Loading</h1>
            </div>
        )
    }

    if (addProduct) {
        return (
            <div className="admin">
                <h1>Tilføj produkt</h1>

                {adminPanel}

                <AdminAddProduct />
            </div>
        )
    }

    if (removeProduct) {
        return (
            <div className="admin">
                <h1>Fjern produkt</h1>

                {adminPanel}

                <AdminRemoveProduct />
            </div>
        )
    }

    if (orders) {
        return (
            <div className="admin">
                <h1>Administrer ordre</h1>

                {adminPanel}

                <AdminOrders />
            </div>
        )
    }
    
    
    return (
        <div className="admin">
            <h1>Admin page</h1>

            {adminPanel}
            <p>Lets make some products!</p>
        </div>
    )


}