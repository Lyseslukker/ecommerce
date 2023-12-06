import React, {useState, useEffect, useRef} from 'react'
import "./Shipping.css"
import { getCookieProducts, getGuestInfo, removeCookieProduct } from '../../customHooks/CookieController';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
import {GoPackageDependents} from "react-icons/go"


export default function Shipping() {

    const userInputRef = useRef()

    const {user, setUser} = useUser()

    // const [fetchTimer, setFetchTimer] = useState(null);
    // const [isSubmitting, setIsSubmitting] = useState(false);


    const [myRoad, setMyRoad] = useState(false);
    const [msg, setMsg] = useState(false);
    const [formErrors, setFormErrors] = useState({
        roadname: false,
        roadnumber: false,
        floor: false,
        door: false
    });

    const navigate = useNavigate()

    const formSubmitHandler = (e) => {
        e.preventDefault()
        const roadname = e.target.roadname.value
        const roadnumber = e.target.roadnumber.value
        const floor = e.target.floor.value
        const door = e.target.door.value

        const addressObject = {
            roadname,
            roadnumber,
            floor,
            door
        }

        fetch("http://localhost:3000/ecommerce/addresscheck", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addressObject)
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            if (data.status === "Success") {
                setMyRoad(data.data)
            }
            if (data.status === "Failed") {
                setFormErrors({
                    roadname: data.data[0],
                    roadnumber: data.data[1],
                    floor: data.data[2],
                    door: data.data[3]
                })
                setMsg(data.msg)
            }
        })
        .catch(err => console.log(err))
    }


    const onInputChangeHandler = (e) => {
        // e.preventDefault()
        const roadname = e.target.value

        if (fetchTimer) {
            clearTimeout(fetchTimer)
        }

        const fetchTimeout = setTimeout(() => {
            fetch(`https://api.dataforsyningen.dk/adresser?q=${roadname}&per_side=10&cache=no-cache`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setSuggestions(data)
                })
                .catch((err) => console.log("DAWA fetch error: ", err))
        }, 500)

        setFetchTimer(fetchTimeout)
    }

    const roadChoice = (e) => {
        const inputRoadChoice = e.currentTarget.dataset.road

        console.log(inputRoadChoice)
        fetch(`https://api.dataforsyningen.dk/adresser/autocomplete?q=${inputRoadChoice}&per_side=10&cache=no-cache`)
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter((address) => {
                    return address.adressebetegnelse !== inputRoadChoice
                })
                console.log(filteredData)
                console.log("Length of suggestions: ", filteredData.length)
                if (filteredData.length < 2) {
                    const userInfo = getGuestInfo()
                    const userpurchases = getCookieProducts()
                    const updatedInfo = {
                        info: {
                            ...userInfo,
                            address: inputRoadChoice
                        },
                        purchases: {
                            ...userpurchases
                        }
                    }
                    // console.log(updatedInfo)
                    setProducts(updatedInfo)
                    setMyRoad(inputRoadChoice)
                }
                if (filteredData.length > 2) {
                    userInputRef.current.value = inputRoadChoice
                    setSuggestions(filteredData)
                }
            })
    }
    
    const confirm = () => {
        setMsg(false)
        const userInfo = getGuestInfo()
        const userpurchases = getCookieProducts()
        const updatedInfo = {
            info: {
                ...userInfo,
                address: myRoad
            },
            purchases: {
                ...userpurchases
            }
        }


        // setIsSubmitting(true)
        fetch("http://localhost:3000/ecommerce/purchase", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedInfo)
        })
        .then(response => response.json())
        .then((data) => {
            if (data.status === "Success") {
                setUser([])
                removeCookieProduct()
                navigate("/")
            }
            if (data.status === "Failed") {
                
            }
            console.log(data)
            // setIsSubmitting(false)
        })
    }


    function createMarkup(text) {
        return { __html: text.replace(/\n/g, '<br />') };
    }



    const leForm = (
        <form onSubmit={formSubmitHandler}>
            {/* <p style={{
                color: "red",
                fontWeight: 500
            }}>{msg ? msg : ""}</p> */}

            {msg ? (<p style={{color: "red", fontWeight: 500}} dangerouslySetInnerHTML={createMarkup(msg)} />) : <p></p>}

            <label htmlFor="roadname">Vejnavn: </label>
            <input type="text" name="roadname" id="roadname" 
                className={formErrors.roadname ? "inputError" : ""}
            />

            <label htmlFor="roadnumber">Vejnummer: </label>
            <input type="text" name="roadnumber" id="roadnumber" 
                className={formErrors.roadnumber ? "inputError" : ""}
            />

            <label htmlFor="floor">Etage: </label>
            <input type="text" name="floor" id="floor" 
                className={formErrors.floor ? "inputError" : ""}
            />

            <label htmlFor="door">Dør: </label>
            <input type="text" name="door" id="door" 
                className={formErrors.door ? "inputError" : ""}
            />

            <button type="submit">Bekræft</button>
        </form>
    )

    if (!myRoad) {
        return (
            <div className='shipping'>
                <h1>Levering</h1>
    
                {leForm}
            </div>
        )
    }
    if (myRoad) {
        return (
            <div className='shipping'>
                <h1>Levering</h1>

                <h2>Send pakken til: </h2>
                <div className="shipping__shipAddress">
                    {/* <GoPackageDependents /> */}
                    <p>{myRoad}</p>
                </div>
                <div className="shipping__buttons">
                    <button className='buttons__confirm' onClick={() => confirm()}>Bekæft</button>
                    <button className='buttons__reject' onClick={() => {setMyRoad(false), setMsg(false), setFormErrors({roadname: false, roadnumber: false, floor: false, door: false})}}>Ikke korrekt</button>
                </div>
            </div>
        )
    }
}