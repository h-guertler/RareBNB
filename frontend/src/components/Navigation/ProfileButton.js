import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({user}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        history.push("/");
      };

      const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };

      useEffect(() => {
        if (!showMenu) return;

        const closeMenu = e => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

    const closeMenu = () => setShowMenu(false);
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button
            onClick={openMenu}
            className="menu-button clickable"
            >
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                    <li>Hello, {user.firstName}</li>
                    <li>{user.username}</li>
                    <li>{user.firstName} {user.lastName}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                    </>
                ) : (
                    <>
                        <OpenModalMenuItem
                        itemText={"Log In"}
                        onItemClick={closeMenu}
                        modalComponent={<LoginFormModal />}
                        />
                        <OpenModalMenuItem
                        itemText={"Sign Up"}
                        onItemClick={closeMenu}
                        modalComponent={<SignupFormModal />}
                        />
                </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
