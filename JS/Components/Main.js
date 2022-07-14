import React from "react";

import {Home} from "./Home";
import Portfolio from "./Portfolio";
import {Contact} from "./Contact";
import Footer from "./Footer";

const Main = () => {
    return (
        <div className="main">
            <div className="container">
                <Home />
                <Portfolio />
                <Contact />
                <Footer/>
            </div>
        </div>
    )
}

export default Main;