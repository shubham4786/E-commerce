import axios from "axios";

export const CHECK_USER_EXISTS_REQUEST = "CHECK_USER_EXISTS_REQUEST";
export const CHECK_USER_EXISTS_SUCCESS = "CHECK_USER_EXISTS_SUCCESS";
export const CHECK_USER_EXISTS_FAILURE = "CHECK_USER_EXISTS_FAILURE";

export const SIGNUP_USER_REQUEST = "SIGNUP_USER_REQUEST";
export const SIGNUP_USER_SUCCESS = "SIGNUP_USER_SUCCESS";
export const SIGNUP_USER_FAILURE = "SIGNUP_USER_FAILURE";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const LOGOUT = "LOGOUT";

export const checkUserExistsRequest = () => ({
  type: CHECK_USER_EXISTS_REQUEST,
});

export const checkUserExistsSuccess = (userExists) => ({
  type: CHECK_USER_EXISTS_SUCCESS,
  payload: userExists,
});

export const checkUserExistsFailure = (error) => ({
  type: CHECK_USER_EXISTS_FAILURE,
  payload: error,
});

export const signupUserRequest = () => ({ type: SIGNUP_USER_REQUEST });

export const signupUserSuccess = (user) => ({
  type: SIGNUP_USER_SUCCESS,
  payload: user,
});

export const signupUserFailure = (error) => ({
  type: SIGNUP_USER_FAILURE,
  payload: error,
});

export const loginUserRequest = () => ({ type: LOGIN_USER_REQUEST });

export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});

export const loginUserFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

export const logout = () => ({ type: LOGOUT });

const API_URL = "http://localhost:3000/users";

export const checkUserExists = (email) => async (dispatch) => {
  dispatch(checkUserExistsRequest());
  try {
    const response = await axios.get(`${API_URL}?email=${email}`);
    const userExists = response.data.length > 0;
    dispatch(checkUserExistsSuccess(userExists));
  } catch (error) {
    dispatch(checkUserExistsFailure(error.message));
  }
};

export const signupUser =
  ({ name, email, password }) =>
  async (dispatch) => {
    dispatch(signupUserRequest());

    try {
      const response = await axios.post(API_URL, { name, email, password });
      dispatch(signupUserSuccess(response.data));
    } catch (error) {
      dispatch(signupUserFailure(error.message));
    }
  };

export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(loginUserRequest());
    try {
      const response = await axios.get(
        `${API_URL}?email=${email}&password=${password}`
      );

      if (!response.data[0]) {
        throw new Error("User Not Registered");
      } else if (
        response.data[0].email === email &&
        response.data[0].password === password
      ) {
        dispatch(loginUserSuccess(response.data[0]));
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      dispatch(loginUserFailure(error.message));
    }
  };
