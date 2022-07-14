import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {client} from "../Services/contentful-settings";

const Card = ({ card }) => {
    const { images, resume, name, technology, route } = card.fields
    const [imageURL, setImageURL] = useState();

    useEffect( () => {
        async function fetchDatas() {
            const assetImage = await client.getAsset(`${images[0].sys.id}`)
            setImageURL(assetImage.fields.file.url)
        }
        fetchDatas()
    }, []);
    return (
        <Link to={route} className="card">
            <div className="card__image">
                    <img src={imageURL} alt={name} />
                </div>
                <div className="card__informations">
                    <div className="card__informations__title">
                        {name}
                    </div>
                    <div className="card__informations__resume">
                        {resume && resume}
                    </div>
                    <div className="card__informations__stack">
                        {technology && technology.map((item, index) => {
                            return (
                                <div key={index} className="tag">
                                    {item}
                                </div>
                            )
                        })}
                    </div>
                </div>
        </Link>
    )
}

export default Card;
