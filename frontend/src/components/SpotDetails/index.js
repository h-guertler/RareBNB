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
        dispatch(spotsActions.fetchOneSpot(spotId));
        dispatch(reviewsActions.fetchReviewsBySpot(spotId));
    }, [dispatch, spotId]);

    const spot = useSelector(state => state.spots.currentSpot);
    const reviews = useSelector(state => state.reviews.currentSpotReviews);
    const user = useSelector(state => state.session.user);

    if (!spot) return <h1>Loading...</h1>
    console.log("reviews length: " + Object.keys(reviews).length)

    console.log("spot keys: " + Object.keys(spot))
    const { name, city, state, country, description, Owner, price, numReviews, avgRating, previewImage, SpotImages } = spot;
    const nonPreviewImages = SpotImages.map((image) => image.previewImage = false);
    const spotImagesToUse = nonPreviewImages.slice(0, 4);

    let ratingString;
    if (typeof avgRating === "number" && avgRating > 0) {
        if (avgRating % 1 === 0) {
            ratingString = `${avgRating}.0`;
        } else {
            let longRatingString = avgRating.toString();
            ratingString = longRatingString.slice(0, 3);
        }
    } else {
        ratingString = "New";
    }

    let reviewString;
    if (Object.keys(reviews).length === 0) {
        reviewString = "New";
    } else if (Object.keys(reviews).length === 1) {
        reviewString = "Review";
    } else {
        reviewString = "Reviews";
    }

    let reviewInfo;
    if (Object.keys(reviews).length === 0) {
        reviewInfo = "";
    } else {
        reviewInfo = `∙ ${numReviews} ${reviewString}`;
    }

    let existingReviewByUser;

    if (user) {
        existingReviewByUser = reviews.Reviews.find(review => review.userId === user.id);
    }
    // console.log("ex rev: " + Object.keys(existingReviewByUser))
    // console.log("ex rev values:" + Object.values(existingReviewByUser))

    let createReviewIsHidden;
    if (!user || ( user && user.id === Owner.id) || existingReviewByUser) {
        createReviewIsHidden = "hidden";
    } else  {
        createReviewIsHidden = "";
    }

    const showAlert = () => {
        alert("Feature coming soon");
    }

    const makeDateString = (date) => {
        let dateString;
        return dateString = date.slice(5, 7) + " " + date.slice(0, 4);
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
                        <div className="num-reviews">{`  ${numReviews}`}</div>
                    </div>
                    <div className="button-div">
                        <button onClick={showAlert}>Reserve</button>
                    </div>
                </div>
            </div>
            <div className="review-div">
                    <h3><i className="fas fa-star"></i>{ratingString} {reviewInfo}</h3>
                    <div className={`clickable ${createReviewIsHidden}`}>
                        <button>Post Your Review</button>
                    </div>
                    {reviews.Reviews.length > 0 ? (
                        <div className="reviews-list">
                            {reviews.Reviews.map(review => (
                                <div key={review.id}>
                                    <h4>{review.User.firstName}</h4>
                                    <h5>{makeDateString(review.createdAt)}</h5>
                                    <p>{review.review}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Be the first to post a review!</p>
                    )}
            </div>
        </div>
    )
}

// post your review button
    // this can only be visible if:
    // there is no existing review by the user
    // and user.id is not Owner.id
export default SpotDetails;
