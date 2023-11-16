import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/getSpots";
const GET_ONE_SPOT = "spots/getOneSpot";

export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        payload: spots
    }
}

export const getOneSpot = (spot) => {
    return {
        type: GET_ONE_SPOT,
        payload: spot
    }
}

export const fetchAllSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots");
    const data = await response.json();
    dispatch(getSpots(data));
    return response;
};

export const fetchOneSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    const data = await response.json();
    dispatch(getOneSpot(data));
    return response;
};

export const createSpot = (spot) => async (dispatch) => {
    const {} = spot;
    const response = await csrfFetch("/api/spots/new", {
        method: "POST",
        body: JSON.stringify({
            // stuff here and above
        })
    });
}

// export const signup = (user) => async (dispatch) => {
//     const { username, email, firstName, lastName, password } = user;
//     const response = await csrfFetch("/api/users", {
//         method: "POST",
//         body: JSON.stringify({
//             username,
//             firstName,
//             lastName,
//             email,
//             password
//         })
//     });

//     console.log("res from thunk: " + Object.keys(response) + Object.values(response)) // logs nothing
//     const data = await response.json(); // returns the user obj if successful
//     console.log("data from thunk: " + Object.keys(data) + Object.values(data))
//     dispatch(setUser(data.user));
//     return response;
//   }

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOTS: {
            newState = Object.assign({}, state);
            newState.spots = action.payload;
            return newState;
        }
        case GET_ONE_SPOT: {
            newState = Object.assign({}, state);
            newState.currentSpot = action.payload;
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;
