import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Logo from "../../img/logo.png"
import Style from "./NavBar.module.css"


export default function NavBar() {


    
    
    return (
        <>
            <div className={Style.navBar}>
                <div className={Style.logo}>
                <Link to="/">
                    <img src={Logo} alt="logo"/>
                </Link>
                </div>
                <nav>
                    <ul className={Style.list}>
                        <li className={Style.list_item}>
                            <Link to="/recipes">Home</Link>
                            <Link to="/about">About</Link>
                            <Link to="/create">Create a recipe</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}