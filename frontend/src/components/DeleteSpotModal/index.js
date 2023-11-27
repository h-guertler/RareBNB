// import React, { useState, useEffect } from "react";
import React from "react";
// import * as spotsActions from "../../store/session";
// import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteSpotModal.css";

function DeleteSpotModal() {
  // const dispatch = useDispatch();
  const { closeModal } = useModal();

  // create a delete thunk and action that immediately updates the store to reflect deletion
    // done -- spotsArray is the variable of all the user's spots
    // done -- add this to a useEffect so that the list of spots re-renders after the deletion is complete
    // done -- then, close the modal
  // onclick:

  const handleDeleteSpot = () => {
    console.log("delete chosen");

    // should be in a .then?
    closeModal();
  }


  return (
    <div className="delete-spot-modal-div">
      <h2>Confirm Delete</h2>
      <h4>Are you sure you want to remove this spot?</h4>
      <button className="yes clickable" onClick={handleDeleteSpot}>Yes (Delete Spot)</button>
      <button className="no clickable" onClick={closeModal}>No (Keep Spot)</button>
    </div>
    )
}

export default DeleteSpotModal;
