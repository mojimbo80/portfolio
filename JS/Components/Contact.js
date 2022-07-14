import React, {useEffect, useState} from "react";

import emailjs from "emailjs-com";
import {EnvironmentOutlined, GlobalOutlined, LinkedinOutlined, HomeOutlined} from '@ant-design/icons'
import {fetchData} from "../Services/portfolio-service";

export const Contact = () => {
    const value = "contact";
    const [contact, setContact] = useState({
        "text": "",
        "localization": "",
        "website": "",
        "linkedin": "",
        "email": ""
    });
    const [isloaded, setIsLoaded] = useState(false);
    useEffect(() => {
        async function fetchHome() {
            setIsLoaded(false)
            let result = await fetchData(value);
            result = [result.data.items[0].fields]
            setIsLoaded(true);
            setContact({
                ...contact,
                text: result[0].text,
                localization: result[0].localization,
                website: result[0].website,
                linkedin: result[0].linkedin,
                email: result[0].email
            })
        }
        !isloaded && fetchHome()
    }, [contact]);
    const onSubmit=(e)=>{
        e.preventDefault()
        emailjs.sendForm("gmail", process.env.REACT_APP_TEMPLATE_ID, e.target, process.env.REACT_APP_USER_ID)
    .then(result => {
                alert('Message bien envoyé ;-)', result.text);
            },
            error => {
                alert( 'Le message n\'a pu être envoyé :-(' ,error.text)
            })
    }
    return (
        <>
            <span className="anchor" id="contact"></span>
                <section className="contact">
                <h2>
                    Contact
                </h2>

            {contact.text && (
                <p>
                    {contact.text}
                </p>
            )}

            <div className="contact__links">
                <div>
                    <EnvironmentOutlined style={{color: "black"}}/>
                    <span><strong>Localisation : </strong></span>
                    {contact.localization && (
                        <span>
                                {contact.localization}
                            </span>
                    )}
                </div>
                <div>
                    <GlobalOutlined style={{color: "black"}}/>
                    <span><strong>Site internet : </strong></span>
                    {contact.website && (
                        <a href={`${contact.website}`}>
                            Mon site
                        </a>
                    )}
                </div>
                <div>
                    <LinkedinOutlined style={{color: "black"}}/>
                    <span><strong>Linkedin : </strong></span>
                    {contact.linkedin && (
                        <a href={`${contact.linkedin}`}>
                            Mon Linkedin
                        </a>
                    )}
                </div>
                <div>
                    <HomeOutlined style={{color: "black"}}/>
                    <span><strong>Email : </strong></span>
                    {contact.email && (
                        <span>
                                {contact.email}
                            </span>
                    )}
                </div>
            </div>
            <div className="contact__form">
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form__group">
                            <div className="form__group__items">
                                <input name="name" placeholder="Non / Prénom" />
                                <input name="name" placeholder="Email" />
                                <textarea name="message" placeholder="Votre message..." />
                            </div>
                            <div className="form__group__items">
                                <button className="button button--primary" type="submit">Envoyer</button>
                            </div>
                        </div>
                    </form>
                </div>
        </section>
            </>
    )
}