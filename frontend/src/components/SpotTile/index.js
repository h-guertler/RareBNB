import React from "react";
// Each tile will have:
    // a square image, which is the spot's previewImage
    // below the image, spot's "city, state" -- aligned w edge of photo
    // below city and state, "price" / night -- aligned w edge of photo
    // below the image, at the same height as city and state: rating as a decimal
    // to the left of rating: a star icon

function SpotTile({spot}) {
    const { previewImage, city, state, price, avgRating, name } = spot;
    return (
        <div className="spot-tile">
            <img src={previewImage} alt={`image of ${name}`}/>
            <span>{`${city}, ${state}`}</span>
            <span>{`$${price}/night`}</span>
            <span>{avgRating}</span>
        </div>
    )
}

export default SpotTile;
