import React, {useEffect, useState} from 'react'
import "./Home.css"
import {WiSunrise} from "react-icons/wi"
import {BiSun} from "react-icons/bi"
import {BsFillMoonStarsFill, BsFillHouseFill} from "react-icons/bs"
import {GiHighGrass} from "react-icons/gi"
import {PiHandWavingBold} from "react-icons/pi"


export default function Home() {

    const [greeting, setGreeting] = useState();

    const currentTime = new Date()
    const timeHour = currentTime.getHours()
    console.log(timeHour)


    useEffect(() => {
        if (timeHour >= 18) {
            setGreeting("Godaften")
        } else if (timeHour >= 12) {
            setGreeting("God eftermiddig")
        } else if (timeHour >= 9) {
            setGreeting("God formiddag")
        } else if (timeHour >= 5) {
            setGreeting("Godmorgen")
        } else {
            setGreeting("Godaften")
        }
    }, []);

    return (
        <div className='home'>
            <h1>{greeting} <PiHandWavingBold /></h1>
            <WiSunrise />
            <BiSun />
            <BsFillHouseFill />
            <BsFillMoonStarsFill />
            <GiHighGrass />
        </div>
    )
}