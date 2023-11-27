// import React, { useState, useEffect } from "react";
import React from "react";
// import * as reviewsActions from "../../store/session";
// import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteReviewModal.css";

function DeleteReviewModal() {
    // const dispatch = useDispatch();
    const { closeModal } = useModal();

    // create a delete thunk and action that immediately updates the store to reflect deletion
      // ?? is the variable of all the spot's reviews
      // or, simply select the review from the array of the reviews of the spot with it's id/user.id
      // add this to a useEffect so that the list of reviews re-renders after the deletion is complete
      // make sure to update the backwards list as well
      // then, close the modal
    // onclick:

    const handleDeleteReview = () => {
      console.log("delete review chosen");

      // should be in a .then?
      closeModal();
    }


    return (
      <div className="delete-review-modal-div">
        <h2>Confirm Delete</h2>
        <h4>Are you sure you want to delete this review?</h4>
        <button className="yes clickable" onClick={handleDeleteReview}>Yes (Delete Review)</button>
        <button className="no clickable" onClick={closeModal}>No (Keep Review)</button>
      </div>
      )
  }

  export default DeleteReviewModal;
