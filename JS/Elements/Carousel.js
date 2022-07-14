import React, {useState} from "react";

import {LeftCircleOutlined, RightCircleOutlined} from "@ant-design/icons"

const Carousel = ({images}) => {
    const [count, setCount] = useState(0);
    const addCount = () => {
        count < images.length - 1
            ? setCount(count + 1)
            : setCount(0)
    }
    const removeCount = () => {
        count <= 0
            ? setCount(images.length - 1)
            : setCount(count - 1)
    }

    return (
       <div className="carousel">
           <div className="carousel__image">
               {
                   images[count] ? <img src={images[count]}/> : <img src={images[count]} />
               }
               <div className="carousel__image__previous" onClick={() => removeCount()}>
                   <LeftCircleOutlined style={{color: "grey"}} />
               </div>
               <div className="carousel__image__next" onClick={() => addCount()}>
                   <RightCircleOutlined style={{color: "grey"}} />
               </div>
           </div>
       </div>
    );
}

export default Carousel;
