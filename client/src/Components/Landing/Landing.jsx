import React from "react";
import { Link } from "react-router-dom";
import "./Landing.module.css";
import landingImg from "../../img/Landing.png";
import Logo from "../../img/Subtract.png"
import Style from "./Landing.module.css"

export default function Landing() {
    return (
        <>
            <div className={Style.background_container}>
                <img className={Style.img_container} src={landingImg} alt="landing"/>
                <img className={Style.logo_container} src={Logo} alt="logo"/>
                <Link to="/recipes">
                    <button className={Style.btn}>Enter</button>
                </Link>
                
            </div>
        </>
    )
}