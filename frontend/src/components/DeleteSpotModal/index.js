import React, { useState, useEffect } from "react";
import * as spotsActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteSpotModal.css";

function DeleteSpotModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  // red button white text: "Yes (Delete Spot)",
  // Dark grey button white text: "No (Keep Spot)".

  return (
    <div className="delete-spot-modal-div">
      <h2>Confirm Delete</h2>
      <h4>Are you sure you want to remove this spot?</h4>
      <button className="yes">Yes (Delete Spot)</button>
      <button className="no">No (Keep Spot)</button>
    </div>
    )
}

export default DeleteSpotModal;
