import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../ReviewFormModal";
import DeleteReviewModal from "../DeleteReviewModal";
import * as spotsActions from "../../store/spots";
import * as reviewsActions from "../../store/reviews";
import "./SpotDetails.css";
import "../ReviewFormModal/ReviewFormModal.css";
import "../DeleteReviewModal/DeleteReviewModal.css";

function SpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const allReviews = useSelector((state) => state.reviews);
    const { currentSpotReviews } = allReviews;
    const reviews = currentSpotReviews; // SHOULD update from store

    const [dynamicAvgRating, setDynamicAvgRating] = useState(null);
    const [prevSpotId, setPrevSpotId] = useState(null);
    const [reviewsUpdated, setReviewsUpdated] = useState(false);

    useEffect(() => {
        if (prevSpotId !== spotId || reviewsUpdated) {
            dispatch(spotsActions.fetchOneSpot(spotId));
            dispatch(reviewsActions.fetchReviewsBySpot(spotId));
            setPrevSpotId(spotId);
            setReviewsUpdated(false);
        }
    }, [dispatch, spotId, prevSpotId]);

    const spot = useSelector(state => state.spots.currentSpot);
    const user = useSelector((state) => state.session.user);

    const placeholderUrl = "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";

    if (!spot || !reviews) return <h1>Loading...</h1>

    let currentReviews = reviews.Reviews;
    let spotImagesToUse = [];

    const { name, city, state, country, description, Owner, price, numReviews, avgRating, previewImage, SpotImages } = spot;
    // setDynamicAvgRating(avgRating);

    if (SpotImages) {const nonPreviewImages = SpotImages.map((image) => image.previewImage = false);

    nonPreviewImages.length <= 4 ? spotImagesToUse = nonPreviewImages : spotImagesToUse = nonPreviewImages.slice(0, 4);}

    let spotImgOne = "";
    let spotImgTwo = "";
    let spotImgThree = "";
    let spotImgFour = "";

    spotImagesToUse[0] ? spotImgOne = spotImagesToUse[0].url : spotImgOne = placeholderUrl;
    spotImagesToUse[1] ? spotImgTwo = spotImagesToUse[1].url : spotImgTwo = placeholderUrl;
    spotImagesToUse[2] ? spotImgThree = spotImagesToUse[2].url : spotImgThree = placeholderUrl;
    spotImagesToUse[3] ? spotImgFour = spotImagesToUse[3].url : spotImgFour = placeholderUrl;

    let reviewForCalloutStr = "";
    if (Object.keys(reviews).length === 0) {
        reviewForCalloutStr = "";
    } else {
        reviewForCalloutStr = numReviews;
    }

    const updateAverageRating = () => {
        const totalRating = reviews.Reviews.reduce((sum, review) => sum + review.rating, 0);
        const updatedAvgRating = totalRating / reviews.Reviews.length;

        setDynamicAvgRating(updatedAvgRating);

        return updatedAvgRating;
    };

    // useEffect(() => {
    //     if (reviews.Reviews.length > 0) {
    //         updateAverageRating(); // Update average rating when reviews change
    //     }
    // }, [reviews.Reviews]);

    // avgRating = updateAverageRating();

    let ratingString;
    if (typeof dynamicAvgRating === "number" && dynamicAvgRating > 0) {
        if (dynamicAvgRating % 1 === 0) {
            ratingString = `${dynamicAvgRating}.0`;
        } else {
            let longRatingString = dynamicAvgRating.toString();
            ratingString = longRatingString.slice(0, 3);
        }
    } else {
        ratingString = "New";
    }

    let reviewString;
    if (Object.keys(currentReviews).length === 0) {
        reviewString = "";
    } else if (Object.keys(currentReviews).length === 1) {
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

    const reviewArray = reviews.Reviews;
    const pageReviews = [];

    for (let i = 0; i < reviewArray.length; i++) {
        pageReviews.unshift(reviewArray[i]);
    }

    return (
        <div className="spot-details">
            <h2>{name}</h2>
            <h4>{`${city}, ${state}, ${country}`}</h4>
            <div className="spot-detail-images">
                <div className="main-image">
                    <img id="main-image" src={previewImage ? previewImage : placeholderUrl} alt="preview"/>
                </div>
                <div className="spot-image-grid">
                    <img id="image-one" src={spotImgOne} alt={`${name}`}/>
                    <img id="image-two" src={spotImgTwo} alt={`${name}`}/>
                    <img id="image-three" src={spotImgThree} alt={`${name}`}/>
                    <img id="image-four" src={spotImgFour} alt={`${name}`}/>
                </div>
            </div>
            <div className="info-and-callout">
            <div className="spot-info">
            <h2>Hosted by {`${Owner.firstName} ${Owner.lastName}`}</h2>
            <p>{`${description}`}</p>
            </div>
            <div className="callout-box">

                    <div className="price-and-ratings-div">
                        <div className="price-div">{`$${price}/`}<span className="night">night</span></div>
                        <div className="ratings-reviews-div">
                            <i className="fas fa-star"></i>
                            {/* should be updating */}
                            <div className="num-reviews">{`${ratingString} ${numReviews > 0 ? ` · ${numReviews} ${reviewString}` : ""}`}</div>
                        </div>
                    </div>
                        <div className="button-div">
                            <button onClick={showAlert} className="clickable reserve-button">Reserve</button>
                        </div>

            </div>
            </div>
            <div className="review-div">
                {/* should be updating */}
                    <h3><i className="fas fa-star"></i>{`${ratingString} ${numReviews > 0 ? ` · ${numReviews} ${reviewString}` : ""}`}</h3>
                    <div className={`review-button ${createReviewIsHidden}`}>
                        <OpenModalButton
                        className="post-review-button clickable"
                        buttonText="Post Your Review"
                        modalComponent={<ReviewFormModal/>}
                        />
                    </div>
                    {reviews.Reviews.length > 0 ? (
                        <div className="reviews-list">
                            {pageReviews.map(review => (
                                <div className="single-review" key={review.id}>
                                    <h4 className="user-name">{review.User.firstName ? review.User.firstName : "loading..."}</h4>
                                    <h5 className="review-date">{makeDateString(review.createdAt)}</h5>
                                    <p className="review-text">{review.review}</p>
                                    <div className={`delete-review-button-div clickable ${user ? (user.id === review.User.id ? "" : " hidden") : " hidden"}`}>
                                        <OpenModalButton
                                            className={`delete-review-button`}
                                            buttonText="Delete"
                                            modalComponent={<DeleteReviewModal/>}
                                        />
                                    </div>
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

export default SpotDetails;
