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
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_FAILURE,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
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
      return { ...state, error: null };

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

    case UPDATE_ADDRESS_REQUEST:
      return { ...state, loading: true, error: null };

    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: { ...state.user, address: payload },
      };

    case UPDATE_ADDRESS_FAILURE:
      return { ...state, loading: false, error: payload };

    case EDIT_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };

    case EDIT_PROFILE_SUCCESS:
      return { ...state, loading: false, user: payload };

    case EDIT_PROFILE_FAILURE:
      return { ...state, loading: false, error: payload };

    case "CHANGE_LOCATION":
      return { ...state, error: null };

    default:
      return state;
  }
};

export default authReducer;
