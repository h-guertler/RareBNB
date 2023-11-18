import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as reviewsActions from "../../store/reviews";
import * as sessionActions from "../../store/session";
import "./ReviewFormModal.css";

function ReviewFormModal() {
    const dispatch = useDispatch();

    // state variables here
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

    }

    // return a form here
    return (
        <div className="review-form-div">
            <h1>How was your stay?</h1>
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
        </div>
    )
}

export default ReviewFormModal;
