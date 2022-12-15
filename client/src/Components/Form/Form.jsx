import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "./validateForm";
import { createRecipe, getDiets } from "../../Redux/actions/actions";
import Style from "./Form.module.css"


const initialForm = {
    title: "",
    score: "",
    healthScore: "",
    summary: "",
    diets: [],
    instructions: "",
    image: "",
    readyInMinutes: ""
}


export default function Form() {

    const dispatch = useDispatch();

    const diets = useSelector( state => state.diets);

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});

    useEffect( () => {
        dispatch(getDiets());
    }, [dispatch]);

    const handleChange = (e) => {
        setErrors(validateForm({...form, [e.target.name]: e.target.value}));
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleChecked = (e) => {

        if (e.target.checked) {
            setForm({
                ...form,
                diets: [...form.diets, e.target.id]
            });
        } else {
            setForm({
                ...form,
                diets: [...form.diets].filter( diet => e.target.id !== diet )
            })
        }

    };

    const handleSubmit = (e) => {

        e.preventDefault();
        
        if(

			!errors.title &&
			form.title &&
			!errors.score &&
			form.score &&
			!errors.healthScore &&
			form.healthScore &&
			!errors.summary &&
			form.summary &&
			!errors.instructions &&
			form.instructions &&
            !errors.image &&
            form.image &&
            !errors.readyInMinutes &&
            form.readyInMinutes &&
			form.diets.length 
        ) {
            dispatch(createRecipe(form));
            alert("A new recipe has been created!");
            setForm(initialForm);
            document.getElementById("createRecipe").reset()
        } else {
            alert("Check your New Recipe, something went wrong :(")
        }
    }

    return (
        <>
            <div className={Style.form_main_container}>
                <h1 className={Style.form_title}>Create a New Recipe</h1>
                <form id="createRecipe">
                    <div className={Style.form_container}>
                        <div className={Style.form_left_container}>
                            {/* Title */}
                            <p className={errors.title ? Style.danger : Style.pass}>{errors.title}</p>
                            <input 
                                type="text" 
                                id="title"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Title"
                                className={errors.title && Style.danger}
                            />
                            {/* Image */}
                            <p className={errors.image ? Style.danger : Style.pass}>{errors.image}</p>
                            <input 
                                type="text"
                                id="image"
                                name="image"
                                placeholder="Enter your url"
                                value={form.image}
                                onChange={handleChange}
                                className={errors.image && Style.danger}
                                />
                            {/* Score */}
                            <p className={errors.score ? Style.danger : Style.pass}>{errors.score}</p>
                            <input 
                                type="text" 
                                id="score"
                                name="score"
                                value={form.score}
                                onChange={handleChange}
                                placeholder="Score"
                                className={errors.score && Style.danger}
                            />
                            {/* HealthScore */}
                            <p className={errors.healthScore ? Style.danger : Style.pass}>{errors.healthScore}</p>
                            <input 
                                type="text" 
                                id="healthScore"
                                name="healthScore"
                                value={form.healthScore}
                                onChange={handleChange}
                                placeholder="Health Score"
                                className={errors.healthScore && Style.danger}
                            />
                            {/* Ready in minutes */}
                            <p className={errors.readyInMinutes ? Style.danger : Style.pass}>{errors.readyInMinutes}</p>
                            <input 
                                type="text"
                                id="readyInMinutes" 
                                name="readyInMinutes"
                                value={form.readyInMinutes}
                                onChange={handleChange}
                                placeholder="Ready in minutes"
                                className={errors.readyInMinutes && Style.danger}
                            />
                            {/* Summary */}
                            <p className={errors.summary ? Style.danger : Style.pass}>{errors.summary}</p>
                            <textarea 
                                name="summary" 
                                id="summary" 
                                value={form.summary}
                                onChange={handleChange}
                                placeholder="Summary"
                                className={errors.summary && Style.danger}
                                >
                            </textarea>
                            {/* Instructions */}
                            <p className={errors.instructions ? Style.danger : Style.pass}>{errors.instructions}</p>
                            <textarea 
                                name="instructions" 
                                id="instructions" 
                                value={form.instructions}
                                onChange={handleChange}
                                placeholder="Instructions"
                                className={errors.instructions && Style.danger}
                                >
                            </textarea>
                        </div>
                        {/* Diets */}
                        <div className={Style.form_right_container}>
                            <div className={Style.form_diets}>
                                {diets.length > 0 && diets.map( diet => (
                                    <label
                                        htmlFor={diet.id.toLowerCase().replace(" ", "").replace("_", "")} key={diet.id}
                                        >
                                            <input 
                                                type="checkbox"
                                                key={diet.id} 
                                                id={diet.id.toLowerCase().replace(" ", "").replace("_", "")}
                                                name={diet.name.toLowerCase().replace(" ", "").replace("_", "")}
                                                onChange={handleChecked}
                                                />
                                        {diet.name}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className={Style.form_buttons}>
                        <button
                            className={Style.btn_reset}
                            onClick={ e => {
                                e.preventDefault();
                                setForm(initialForm);
                                setErrors({});
                                document.getElementById("createRecipe").reset();
                            }}
                            >
                                Reset form
                        </button>
                        <button className={Style.btn_create} onClick={handleSubmit}>
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}