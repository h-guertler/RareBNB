import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from "../../store/spots";
import * as reviewsActions from "../../store/reviews";
import "./SpotDetails.css";

function SpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    useEffect(() => {
        dispatch(spotsActions.fetchOneSpot(spotId))
    }, [dispatch, spotId]);

    const spot = useSelector(state => state.spots.currentSpot);

    if (!spot) return <h1>Loading...</h1>

    console.log("spot keys: " + Object.keys(spot))
    const { name, city, state, country, description, Owner, price, numReviews, avgRating, previewImage, SpotImages } = spot;
    const nonPreviewImages = SpotImages.map((image) => image.previewImage = false);
    const spotImagesToUse = nonPreviewImages.slice(0, 4);

    let ratingString;
    console.log(avgRating + " is avgRating")
    if (typeof avgRating === "number" && avgRating > 0) {
        if (avgRating % 1 === 0) {
            ratingString = `${avgRating}.0`;
        } else {
            let longRatingString = avgRating.toString();
            ratingString = longRatingString.slice(0, 3);
        }
    } else {
        ratingString = "new"
    }

    const showAlert = () => {
        alert("Feature coming soon");
    }

    return (
        <div className="spot-details">
            <h2>{name}</h2>
            <h4>{`${city}, ${state}, ${country}`}</h4>
            <div className="spot-detail-images">
                <div className="main-image">
                    <img src={previewImage} alt="preview"/>
                </div>
                <div className="spot-image-grid">
                {spotImagesToUse.map((image) => (
                    <div key={image.id}>
                        <img src={image.url} alt={`${spot.name} preview`}/>
                    </div>
                ))}
                </div>
            </div>
            <h2>Hosted by {`${Owner.firstName} ${Owner.lastName}`}</h2>
            <p>{`${description}`}</p>
            <div className="callout-box">
                <div className="first-row">
                    <div className="price-div">{`$${price}/night`}</div>
                    <div className="ratings-reviews-div">
                        <i className="fas fa-star"></i>
                        <div>{ratingString}</div>
                        <div className="num-reviews">{`${numReviews}`}</div>
                    </div>
                    <div className="button-div">
                        <button onClick={showAlert}>Reserve</button>
                    </div>
                </div>
            </div>
            <div className="review-div">
                    <h3>reviews</h3>
            </div>
        </div>
    )
}

// in reviews: write a thunk/action to get the reviews by spot
// h3 with star icon, ratingStr, tiny bullet point, numReviews, text "reviews"
// post your review button
    // this can only be visible if: state's user is not null,
    // and user.id is not Owner.id
    // and none of the reviews retrieved has a userId of user.id
// then, map that array.
// h4 with the user's firstName
// grey h3 with createdAt, or part of it
// p with the review text
// a gap before the next review
export default SpotDetails;
