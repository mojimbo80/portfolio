import React, {useEffect, useState} from "react";

// import Carousel from "../Elements/Carousel";
import Carousel from 'nuka-carousel';
import Footer from "./Footer";
import {getAsset, getDataPageInformations} from "../Services/portfolio-service";
import Loader from "../Elements/Loader";

const Project = ({id}) => {
    const [information, setInformation] = useState();
    const [imageURL, setImageURL] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            getDataPageInformations(id)
                .then(res => {
                    setInformation(res.data.fields);
                    res.data.fields.images.map((item, index) => {
                        getAsset(`${item.sys.id}`)
                            .then(response => {
                                setImageURL(imageURL => ([...imageURL, response.data.fields.file.url]));
                            })
                            .then(() => setIsLoaded(true))
                    })
                })
        }, 1000)
    }, []);

        return (
            <div className="main">
                    <section className="project">
                        { !isLoaded
                            ? <Loader/>
                            :
                        <>

                        {information && information.name !== "undefined" && (
                            <h2>
                                {information.name}
                            </h2>
                        )}

                        <div className="project__slider">
                            <Carousel defaultControlsConfig={{
                                nextButtonText: 'Suivant',
                                prevButtonText: 'Précédent',
                                pagingDotsStyle: {
                                    fill: 'black',
                                    margin: '0 0.5rem',
                                }
                            }}>
                                {
                                    imageURL.map((value, key) => {
                                        return <img key={key} src={value} />
                                    })
                                }
                            </Carousel>
                        </div>

                        <div className="project__informations">

                            <div className="project__informations__items">
                                <h3>Présentation:</h3>
                                {
                                    information && typeof information.presentation.content[0].content[0].value !== "undefined"
                                        ? <p>{information.presentation.content[0].content[0].value}</p>
                                        : ""
                                }
                            </div>

                            <div className="project__informations__items">
                                <h3>Informations:</h3>
                                <div className="project__informations__items__client">
                                    <h4>Client:</h4>
                                    {
                                        information && typeof information.client !== "undefined"
                                            ? <span>{information.client}</span>
                                            : ""
                                    }
                                </div>

                                <div className="project__informations__items__roles">
                                    <h4>Rôles:</h4>
                                    {
                                        information && typeof information.roles !== "undefined"
                                            ?
                                            Object.keys(information.roles).map(function (key, index) {
                                                return (
                                                    <span key={index} className="tag">
                                                        {information.roles[key]}
                                                    </span>
                                                )
                                            })
                                            : ""
                                    }
                                </div>
                                <div className="project__informations__items__date">
                                    <h3>Date:</h3>
                                    {
                                        information && typeof information.date !== "undefined"
                                            ? <span>{information.date}</span>
                                            : ""
                                    }
                                </div>
                                <div className="project__informations__items__technologies">
                                <h4>Technologies:</h4>
                                {
                                    information && typeof information.technology !== "undefined"
                                        ?
                                        Object.keys(information.technology).map(function (key, index) {
                                            return (
                                                <span key={index} className="tag">
                                                        {information.technology[key]}
                                                    </span>
                                            )
                                        })
                                        : ""
                                }
                                </div>
                                <div className="project__informations__items__url">
                                    <h3>URL:</h3>
                                    {
                                        information && typeof information.link !== "undefined"
                                            ? <a href={information.link}>Découvrir</a>
                                            : <span>Non disponible</span>
                                    }
                                </div>
                            </div>
                        </div>
                        </>
                        }
                    </section>
                <Footer/>
            </div>
        )

}

export default Project;