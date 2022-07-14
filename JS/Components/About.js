import React, {useEffect, useState} from "react";

import { CheckCircleOutlined } from '@ant-design/icons'
import {fetchData} from "../Services/portfolio-service";

const About = () => {
    const value = "skills";
    const [skills, setSkills] = useState({
        "presentation": [],
        "backend": "",
        "frontend": "",
        "others": ""
    });
    const [isloaded, setIsLoaded] = useState(false);
    useEffect(() => {
        async function fetchHome() {
            setIsLoaded(false)
            let result = await fetchData(value);
            result = [result.data.items[0].fields]
            setIsLoaded(true);
            setSkills({
                ...skills,
                presentation: result[0].presentation.content,
                backend: result[0].backend,
                frontend: result[0].frontend,
                others: result[0].others
            })
        }
        !isloaded && fetchHome()
    }, [skills]);

    return (
        <>
            <span className="anchor" id="about"></span>
            <section className="about">
                <h3>
                    A propos
                </h3>
                <h4>Présentation</h4>
                <div className="about__presentation">
                    <div className="about__presentation__text">

                    </div>
                    <div className="about__presentation__cv">
                    </div>
                </div>
                <h4>Compétences</h4>
                <div className="about__competences">
                    <div className="about__competences__block">
                        <div className="about__competences__block__title">
                            Backend
                        </div>
                        <div className="about__competences__block__items">
                            {
                                skills.backend && skills.backend.map((value) => {
                                   return  (
                                       <div className="about__competences__block__items__item">
                                           <CheckCircleOutlined />
                                           {value}
                                       </div>
                                   )
                                })
                            }
                        </div>
                    </div>
                    <div className="about__competences__block">
                        <div className="about__competences__block__title">
                            Frontend
                        </div>
                        <div className="about__competences__block__items">
                            {
                                skills.frontend && skills.frontend.map((value) => {
                                    return  (
                                        <div className="about__competences__block__items__item">
                                            <CheckCircleOutlined />
                                            {value}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="about__competences__block">
                        <div className="about__competences__block__title">
                            Autres
                        </div>
                        <div className="about__competences__block__items">
                            {
                                skills.others && skills.others.map((value) => {
                                    return  (
                                        <div className="about__competences__block__items__item">
                                            <CheckCircleOutlined />
                                            {value}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About;