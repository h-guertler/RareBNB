import { csrfFetch } from "./csrf";

// 2 POJO action creators: setUser and removeUser
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

// slice of state should look like current user, with createdAt and updatedAt, if user exists
const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

// const removeUser = () => {
//     return {
//         type: REMOVE_USER
//     };
// };

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({
        credential,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const signup = async () => {

  }

  export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

// if no user, user: null obj
// this is the default
const initialState = { user: null };

// add a session reducer
const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER: {
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        }
        case REMOVE_USER: {
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        }
        default:
            return state;
    }
};

export default sessionReducer;
