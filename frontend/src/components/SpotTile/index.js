import React from "react";
import "./SpotTile.css"
// Each tile will have:
    // a square image, which is the spot's previewImage
    // below the image, spot's "city, state" -- aligned w edge of photo
    // below city and state, "price" / night -- aligned w edge of photo
    // below the image, at the same height as city and state: rating as a decimal
    // to the left of rating: a star icon
    // <img src={previewImage} alt={`image of ${name}`}/>

function SpotTile({spot}) {
    const { previewImage, city, state, price, avgRating, name } = spot;
    return (
        <div className="spot-tile clickable">
            <img src={previewImage} className="previewImage" alt="spot preview"/>
            <span className="first-row">
                <span className="city-and-state">{`${city}, ${state} `}</span>
                <i class="fas fa-star"></i>
                <span>{(avgRating >= 1 && avgRating <= 5 ? avgRating : "new")}</span>
            </span>
            <span classname="second-row">
                <span className="price">{` $${price}/night `}</span>
            </span>
        </div>
    )
}

export default SpotTile;
