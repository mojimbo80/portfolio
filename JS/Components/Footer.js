import React, {useEffect, useState} from 'react';
import {fetchData} from "../Services/portfolio-service";

const Footer = () => {
    const value = "footer";
    const [footer, setFooter] = useState({
        "copyright": "",
        "version": ""
    });
    const [isloaded, setIsLoaded] = useState(false);
    useEffect(() => {
        async function fetchFooter() {
            setIsLoaded(false)
            let result = await fetchData(value);
            result = [result.data.items[0].fields]
            setIsLoaded(true);
            setFooter({
                ...footer,
                copyright: result[0].copyright,
                version: result[0].version,
            })
        }
        !isloaded && fetchFooter()
    }, [footer]);

    return (
            <div className="footer">
                <div className="footer__credits">
                    {
                        footer && typeof footer.copyright !== undefined
                            ? footer.copyright
                            : ""
                    }
                </div>
                <div className="footer__website-version">
                    <div>
                        {
                            footer && typeof footer.version !== undefined
                                ? footer.version
                                : ""
                        }
                    </div>
                </div>
            </div>
    )
}

export default Footer;