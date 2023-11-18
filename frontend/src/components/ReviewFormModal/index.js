import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as reviewsActions from "../../store/reviews";
import * as sessionActions from "../../store/session";
import "./ReviewFormModal.css";

function ReviewFormModal() {
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.currentSpot);

    const [reviewText, setReviewText] = useState("");
    const [stars, setStars] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [errors, setErrors] = useState({});

    const { closeModal } = useModal();

    useEffect(() => {
        if (reviewText.length < 10
            || !stars) {
                setIsDisabled(true);
            } else {
                setIsDisabled(false);
            }

    }, [reviewText, stars]);

    // how to handle shading?

    const handleStars = (e) => {
        setStars(e.target.value);
    };

    // make a handleSubmit here
    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors({});
        const currErrors = {};
        const spotId = spot.id;

        console.log("about to dispatch from handleSubmit")
        return dispatch(
            reviewsActions.addReview(spotId, {
              review: reviewText,
              stars
            })
          )
            .then(closeModal)
            .catch(async (res) => {
                console.log("inside catch")
              const data = await res.json();
              if (data) {
                console.log("data: " + Object.keys(data))
                console.log("data: " + Object.values(data))
              } else {
                console.log("no data");
              }
            });
        }

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h1>How was your stay?</h1>
            {Object.keys(errors).length !== 0 && <p>{`Errors: ${Object.keys(errors)}`}</p>}
            <input
            type="textarea"
            placeholder="Leave your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            ></input>
            <label>
                <input
                    type="radio"
                    value="1"
                    onChange={handleStars}
                    checked={stars == 1}
                />
                <input
                    type="radio"
                    value="2"
                    onChange={handleStars}
                    checked={stars == 2}
                />
                <input
                    type="radio"
                    value="3"
                    onChange={handleStars}
                    checked={stars == 3}
                />
                <input
                    type="radio"
                    value="4"
                    onChange={handleStars}
                    checked={stars == 4}
                />
                <input
                    type="radio"
                    value="5"
                    onChange={handleStars}
                    checked={stars == 5}
                />
                Stars
            </label>
            <button
            type="submit" disabled={isDisabled}>
            Submit Your Review
            </button>
        </form>
    )
}

export default ReviewFormModal;
