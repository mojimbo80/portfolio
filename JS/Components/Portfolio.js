import React, {useEffect, useState} from "react";

import Card from "../Elements/Card";
import {fetchData} from "../Services/portfolio-service";

const Portfolio = () => {
    const value = "project";
    const [project, setProject] = useState({
        "card": [],
    });
    const [isloaded, setIsLoaded] = useState(false);
    useEffect(() => {
        async function fetchProject() {
            setIsLoaded(false)
            let result = await fetchData(value);
            result = [result]
            setIsLoaded(true);
            setProject({
                ...project,
                card: result[0].data.items,
            })
        }
        !isloaded && fetchProject()
    }, [project]);

    return (
        <>
            <span className="anchor" id="portfolio"></span>
            <section className="portfolio">
                    <h2>
                        Portfolio
                    </h2>
                    <div className="portfolio__cards">
                    {
                        project.card.map((card, index) => <Card card={card} key={index}/>)
                    }
                    </div>
            </section>
        </>
    )
}

export default Portfolio;