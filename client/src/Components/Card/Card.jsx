import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Style from "./Card.module.css";
import imageNotFound from "../../img/image_not_found.png";



export default function Card({id, title, image, diets}) {

    const getDiets = () => {
        let arrayDiets = [];
        if (diets) {
            for(let diet of diets) {
                typeof diet === "object" ? arrayDiets.push(diet.name) : arrayDiets.push(diet);
            }
        }
        return arrayDiets.length ? arrayDiets.join(", ") : "This receipt do not have diets."
    }
    return (
        <>
            <Link to={`/recipes/${id}`} className={Style.card}>
                <div className={Style.img_recipe}>
                    <img src={image || imageNotFound} alt={title} />
                </div>
                <div className={Style.card_info}>
                    <h2 className={Style.card_title}>{title}</h2>
                    <h4 className={Style.card_diets}>{getDiets()}</h4>
                </div>
            </Link>
        </>
    )
}