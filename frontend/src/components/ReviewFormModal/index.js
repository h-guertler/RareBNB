import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as reviewsActions from "../../store/reviews";
// import * as sessionActions from "../../store/session";
import "./ReviewFormModal.css";

function ReviewFormModal() {
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.currentSpot);

    const [reviewText, setReviewText] = useState("");
    const [stars, setStars] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [errors, setErrors] = useState({});
    const [hoveredStarNum, setHoveredStarNum] = useState(null);

    const { closeModal } = useModal();

    useEffect(() => {
        if (reviewText.length < 10
            || !stars) {
                setIsDisabled(true);
            } else {
                setIsDisabled(false);
            }

    }, [reviewText, stars]);


    const handleStarHover = (num) => {
        setHoveredStarNum(num);
    };

    const handleStarClick = () => {
        setStars(hoveredStarNum);
    };

    let starArray = [1, 2, 3, 4, 5];

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});
        const spotId = spot.id;

        try {
        await dispatch(
            reviewsActions.addReview(spotId, {
              review: reviewText,
              stars
            })
          );
          closeModal();
        } catch (res) {
                const data = await res.json();
                if (data.errors) {
                    setErrors(data.errors);
                }
            }
        };

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h1>How was your stay?</h1>
            {Object.keys(errors).length !== 0 && <p>{`Errors: ${Object.keys(errors)}`}</p>}
            <textarea
            type="textarea"
            id="review-text-input"
            placeholder="Leave your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
            <div className="star-container">
                {
                starArray.map((starVal) => (
                    <i key={starVal}
                        className={`fa-solid fa-star star ${starVal <= (hoveredStarNum || stars) ? "active" : ""}`}
                        onMouseEnter={() => handleStarHover(starVal)}
                        onMouseLeave={() => handleStarHover(null)}
                        onClick={handleStarClick}
                    ></i>
                ))
                }
            <label id="label-for-stars">Stars</label>
            </div>
            <button
            type="submit"
            disabled={isDisabled}
            className={`${isDisabled.toString()}  clickable`}
            id="submit-review-button"
            >
            Submit Your Review
            </button>
        </form>
    )
}

export default ReviewFormModal;
