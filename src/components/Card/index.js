import React from 'react';
import './index.css'

function Card({title,imageUrl,body}){
    return (
        <div className="card-container">
            <div className="image-container">
                <img src={imageUrl} alt=""/>
            </div>
        </div>
    )

}

export default Card