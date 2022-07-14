import React, {useEffect, useState} from "react";

import {fetchData} from "../Services/portfolio-service";

export const Home = () => {
    const value = "home";
    const [home, setHome] = useState({
        welcome: "",
        presentation: []
    });
    const [isloaded, setIsLoaded] = useState(false);
    useEffect(() => {
        async function fetchHome() {
            setIsLoaded(false)
            let result = await fetchData(value);
            result = [result.data.items[0].fields]
            setIsLoaded(true);
            setHome({
                ...home,
                welcome: result[0].welcome,
                presentation: result[0].presentation.content,
            })
        }
        !isloaded && fetchHome()
    }, [home]);

    return (
        <>
            <span className="anchor" id="home"></span>
            <section className="home">
                <div className="container">
                    <div className="home__welcome">
                        { home.welcome && home.welcome}
                    </div>

                    { home.presentation && home.presentation.map((value, index) => {
                        return value.content.map((value, index) => {
                            return (<p key={index}>{value.value}</p>)
                        })
                    })}
                </div>
            </section>
        </>
    )
}