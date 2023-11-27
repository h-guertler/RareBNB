import React from "react";
import { useModal } from "../../context/Modal";

function OpenModalButton({ modalComponent, buttonText, onButtonClick, onModalClose, className }) {
    const { setModalContent } = useModal();

    const onClick = (e) => {
        e.stopPropagation();
        if (typeof onButtonClick === "function") onButtonClick();
        if (typeof onModalClose === "function") onModalClose();
        setModalContent(modalComponent); //changed from context
    }

    return (
        <button onClick={onClick} className={className}>{buttonText}</button>
    )
}

export default OpenModalButton;
