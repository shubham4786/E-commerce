import {
  CHECK_USER_EXISTS_FAILURE,
  CHECK_USER_EXISTS_REQUEST,
  CHECK_USER_EXISTS_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  SIGNUP_USER_FAILURE,
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_SUCCESS,
} from "./authActions";

const initialState = {
  user: null,
  loading: false,
  error: null,
  userExists: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHECK_USER_EXISTS_REQUEST:
      return { ...state, loading: true, error: null };

    case SIGNUP_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case CHECK_USER_EXISTS_SUCCESS:
      return { ...state, loading: false, userExists: payload };

    case SIGNUP_USER_SUCCESS:
      return { ...state, loading: false, user: payload };

    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, user: payload };

    case CHECK_USER_EXISTS_FAILURE:
      return { ...state, loading: false, error: payload };

    case SIGNUP_USER_FAILURE:
      return { ...state, loading: false, error: payload };

    case LOGIN_USER_FAILURE:
      return { ...state, loading: false, error: payload };

    case LOGOUT:
      return { ...state, user: null };

    default:
      return state;
  }
};

export default authReducer;
