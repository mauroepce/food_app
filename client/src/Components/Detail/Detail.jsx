import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesById } from "../../Redux/actions/actions";
import Loading from "../../img/loading_gif.gif";
import Style from "./Detail.module.css"

export default function Detail({
	match: {
		params: { id },
	},
}) {


   const dispatch = useDispatch();
   const recipe = useSelector( state => state.recipeById);
   const [loading, setLoading] = useState(true)

   useEffect(() => {
        dispatch(getRecipesById(id));
        setTimeout(() => {
            setLoading(false);
        }, 2000);
   }, [dispatch, id])


    return (
        <>
            <div className={Style.main_container}>
                {loading ? (
                    <div>
                        <img 
                            className={Style.loading}
                            src={Loading} 
                            alt="Loading" 
                            />
                    </div>
                ) : recipe.title ? (
                    <div>
                        <h1 className={Style.detail_title}>{recipe.title}</h1>
                        <div className={Style.detail_container}>
                            <div className={Style.left_container}>
                                <img src={recipe.image} alt={`image_title: ${recipe.title}`} />
                                <div className={Style.detail_points}>
                                    <h1>
                                        {recipe.score && `${recipe.score} Score`}
                                    </h1>
                                    <h1>
                                        {recipe.healthScore && `❤️ ${recipe.healthScore}%`}
                                    </h1>
                                    <h1>Healthy</h1>
                                </div>
                            </div>
                            <div className={Style.right_container}>
                                <h2>{recipe.summary && "Summary"}</h2>
                                <div className={Style.detail_summary}>
                                    <p 
                                        dangerouslySetInnerHTML={{__html: recipe.summary}}
                                    />
                                </div>
                                <div className={Style.detail_summary}>
                                    <p>⏲️ Preparation time: {recipe.readyInMinutes}</p>
                                </div>
                                <h2>{recipe.instructions && "Instructions"}</h2>
                                <div className={Style.detail_instructions}>
                                    <p 
                                        dangerouslySetInnerHTML={{__html: recipe.instructions}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : ( 
                    <h1>Something went wrong</h1>
                )}
            </div>
        </>
    )
}