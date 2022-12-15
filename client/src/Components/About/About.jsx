import React from "react";
import Style from "./About.module.css"


export default function About() {
    return (
        <>
            <div className={Style.container}>
                <div className={Style.about}>
                    <h1>diety - click your diet</h1>
                    <h3>Henry-Food Individual Project</h3>
                    <p>This project was created as part of my fullstack developer education at <a className='href-henry' href='https://www.soyhenry.com/' target='_blank' rel='noopener noreferrer'>Henry bootcamp</a>. In order to map all the different 
                    recipess food, this app consumes data from <a className='href-spoon' href='https://spoonacular.com/' target='_blank' rel='noopener noreferrer'>the food API</a>. It is also possible to create a new recipe food, entering a name, score, 
                    health score and instructions on how to prepare a delicious dish.</p>
                    <p>Any feedback you can provide will be greatly appreciated. Thank you, and don't forget to create your recipe food!</p>
                </div>
                <h1 className={Style.tech_title}>Used technologies:</h1>
                <div className={Style.tech_container}>
                     <div className={Style.javascript}>
                        <img className={Style.img_javascript} src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="" />
                        <h1 className={Style.text_javascript}>Javascript</h1>
                    </div>
                    <div className={Style.html}>
                        <img className={Style.img_html} src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="" />
                        <h1 className={Style.text_html}>HTML</h1>
                    </div>
                    <div className={Style.css}>
                        <img className={Style.img_css} src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="" />
                        <h1 className={Style.text_css}>CSS</h1>
                    </div>
                    <div className={Style.react}>
                        <img className={Style.img_react} src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="" />
                        <h1 className={Style.text_react}>React</h1>
                    </div>
                    <div className={Style.redux}>
                        <img className={Style.img_redux} src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="" />
                        <h1 className={Style.text_redux}>Redux</h1>
                    </div>
                    <div className={Style.express}>
                        <img className={Style.img_express} src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="" />
                        <h1 className={Style.text_express}>Express</h1>
                    </div>
                    <div className={Style.PostgreSQL}>
                        <img className={Style.img_PostgreSQL} src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="" />
                        <h1 className={Style.text_PostgreSQL}>PostgreSQL</h1>
                    </div>
                </div>
            </div>
        </>
    )
}