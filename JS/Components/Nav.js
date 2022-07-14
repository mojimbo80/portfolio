import React, {useEffect, useState} from 'react';

import {Link} from "react-router-dom";
import {MenuOutlined} from "@ant-design/icons";
import {fetchData, getAsset} from "../Services/portfolio-service";

const Nav = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const value = "home";
    const [nav, setNav] = useState({
        "resume": ""
    });
    const [isloaded, setIsLoaded] = useState(false);
    useEffect(() => {
        async function fetchHome() {
            setIsLoaded(false)
            let result = await fetchData(value);
            let res = getAsset(result.data.items[0].fields.resume.sys.id)
            res.then(response => {
                setNav({
                    ...nav,
                    resume: response.data.fields.file.url,
                })
            })
            setIsLoaded(true);
        }
        !isloaded && fetchHome()
    }, []);

    return (

    <div className="nav">
        <div className="container">
            <div className="nav__brand">
                <Link to="/">Alexandre Piquion</Link>
            </div>
                <ul className={`nav__menu ${ isOpen ? "isOpen" : ""}`}>
                    <li>
                        <a href="/#portfolio">Réalisations</a>
                    </li>
                    <li>
                        <a href="/#contact">Contact</a>
                    </li>
                    <li className="nav__menu__cv">
                        {
                            <a href={`/${nav.resume}`} download target="_blank">CV</a>
                        }
                    </li>
                </ul>
            <MenuOutlined style={{color: "black"}} onClick={toggleMenu}/>
        </div>
    </div>
    )
}

export default Nav;