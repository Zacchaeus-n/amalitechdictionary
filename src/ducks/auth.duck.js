import { showCurrentUserSuccess } from "./user.duck";

export const AUTH_INFO_SUCCESS = "app/auth/AUTH_INFO_SUCCESS";
// LOGIN
export const LOGIN_REQUEST = "app/auth/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "app/auth/LOGIN_SUCCESS";
export const LOGIN_ERROR = "app/auth/LOGIN_ERROR";
// UPDATE
export const SIGNUP_REQUEST = "app/auth/SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "app/auth/SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "app/auth/SIGNUP_ERROR";
// UPDATES
export const EMAIL_UPDATE_REQUEST = "app/auth/EMAIL_UPDATE_REQUEST";
export const EMAIL_UPDATE_SUCCESS = "app/auth/EMAIL_UPDATE_SUCCESS";
export const EMAIL_UPDATE_ERROR = "app/auth/EMAIL_UPDATE_ERROR";

export const PASSWORD_UPDATE_REQUEST = "app/auth/PASSWORD_UPDATE_REQUEST";
export const PASSWORD_UPDATE_SUCCESS = "app/auth/PASSWORD_UPDATE_SUCCESS";
export const PASSWORD_UPDATE_ERROR = "app/auth/PASSWORD_UPDATE_ERROR";
// LOGOUT
export const LOGOUT_REQUEST = "app/auth/LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "app/auth/LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "app/auth/LOGOUT_ERROR";
// PASSWORD RESET
export const PASSWORD_RESET_REQUEST = "app/auth/PASSWORD_RESET_REQUEST";
export const PASSWORD_RESET_SUCCESS = "app/auth/PASSWORD_RESET_SUCCESS";
export const PASSWORD_RESET_ERROR = "app/auth/PASSWORD_RESET_ERROR";
// INIT STATE
const initialState = {
  isAuthenticated: false,

  loginInProgress: false,
  loginError: null,

  signupInProgress: false,
  signupError: null,

  emailUpdateInProgress: false,
  emailUpdateError: null,

  passwordUpdateInProgress: false,
  passwordUpdateError: null,

  logoutInProgress: false,
  logoutError: null,

  passwordResetInProgress: false,
  passwordResetError: null,
  passwordResetSuccess: null,
};

const authReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_INFO_SUCCESS:
      return { ...state, isAuthenticated: !!payload };

    case LOGIN_REQUEST:
      return { ...state, loginInProgress: true, loginError: null };
    case LOGIN_SUCCESS:
      return { ...state, loginInProgress: false, isAuthenticated: true };
    case LOGIN_ERROR:
      return { ...state, loginInProgress: false, loginError: payload };

    case SIGNUP_REQUEST:
      return { ...state, signupInProgress: true, signupError: null };
    case SIGNUP_SUCCESS:
      return { ...state, signupInProgress: false, isAuthenticated: true };
    case SIGNUP_ERROR:
      return { ...state, signupInProgress: false, signupError: payload };

    case EMAIL_UPDATE_REQUEST:
      return { ...state, emailUpdateInProgress: true, emailUpdateError: null };
    case EMAIL_UPDATE_SUCCESS:
      return { ...state, emailUpdateInProgress: false, isAuthenticated: true };
    case EMAIL_UPDATE_ERROR:
      return {
        ...state,
        emailUpdateInProgress: false,
        emailUpdateError: payload,
      };

    case PASSWORD_UPDATE_REQUEST:
      return {
        ...state,
        passwordUpdateInProgress: true,
        passwordUpdateError: null,
      };
    case PASSWORD_UPDATE_SUCCESS:
      return {
        ...state,
        passwordUpdateInProgress: false,
        isAuthenticated: true,
      };
    case PASSWORD_UPDATE_ERROR:
      return {
        ...state,
        passwordUpdateInProgress: false,
        passwordUpdateError: payload,
      };

    case LOGOUT_REQUEST:
      return { ...state, logoutInProgress: true, logoutError: null };
    case LOGOUT_SUCCESS:
      return { ...state, logoutInProgress: false, isAuthenticated: false };
    case LOGOUT_ERROR:
      return { ...state, logoutInProgress: false, logoutError: payload };

    case PASSWORD_RESET_REQUEST:
      return {
        ...state,
        passwordResetInProgress: true,
        passwordResetError: null,
        passwordResetSuccess: "",
      };
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        passwordResetInProgress: false,
        isAuthenticated: false,
        passwordResetSuccess: payload,
      };
    case PASSWORD_RESET_ERROR:
      return {
        ...state,
        passwordResetInProgress: false,
        passwordResetError: payload,
        passwordResetSuccess: "",
      };

    default:
      return state;
  }
};

// action creators
export const authInfoSuccess = (user) => ({
  type: AUTH_INFO_SUCCESS,
  payload: user,
});

// action creators
export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = () => ({ type: LOGIN_SUCCESS });
export const loginError = (e) => ({ type: LOGIN_ERROR, payload: e });

export const signupRequest = () => ({ type: SIGNUP_REQUEST });
export const signupSuccess = () => ({ type: SIGNUP_SUCCESS });
export const signupError = (e) => ({ type: SIGNUP_ERROR, payload: e });

export const emailUpdateRequest = () => ({ type: EMAIL_UPDATE_REQUEST });
export const emailUpdateSuccess = (res) => ({
  type: EMAIL_UPDATE_SUCCESS,
  payload: res,
});
export const emailUpdatesError = (e) => ({
  type: EMAIL_UPDATE_ERROR,
  payload: e,
});

export const passwordUpdateRequest = () => ({ type: PASSWORD_UPDATE_REQUEST });
export const passwordUpdateSuccess = (res) => ({
  type: PASSWORD_UPDATE_SUCCESS,
  payload: res,
});
export const passwordUpdateError = (e) => ({
  type: PASSWORD_UPDATE_ERROR,
  payload: e,
});

export const logoutRequest = () => ({ type: LOGOUT_REQUEST });
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });
export const logoutError = (e) => ({ type: LOGOUT_ERROR, payload: e });

export const passwordResetRequest = () => ({ type: PASSWORD_RESET_REQUEST });
export const passwordResetSuccess = (res) => ({
  type: PASSWORD_RESET_SUCCESS,
  payload: res,
});
export const passwordResetError = (e) => ({
  type: PASSWORD_RESET_ERROR,
  payload: e,
});

// middlewares
// login
export const login = (email, password) => (dispatch, getState, firebase) => {
  dispatch(loginRequest());
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => dispatch(loginSuccess()))
    .catch((e) => {
      dispatch(loginError(e));
      throw e;
    });
};

// signup
export const signup = (params) => (dispatch, getState, firebase) => {
  const { email, password, firstName, lastName } = params;
  const fullName = `${firstName} ${lastName}`;
  dispatch(signupRequest());
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => res.user.updateProfile({ displayName: fullName }))
    .then(() => dispatch(loginSuccess()))
    .catch((e) => {
      dispatch(signupError(e));
      throw e;
    });
};

// update email
export const emailUpdates = (email) => (dispatch, getState, firebase) => {
  //   const { email } = params;
  //   const fullName = `${firstName} ${lastName}`;
  dispatch(emailUpdateRequest());
  return (
    firebase
      .auth()
      .updateEmail(email)
      // .then((res) => res.user.updateProfile({ displayName: fullName }))
      .then(() => dispatch(emailUpdateSuccess()))
      .catch((e) => {
        dispatch(emailUpdatesError(e));
        throw e;
      })
  );
};

// update password
export const passwordUpdate = (password) => (dispatch, getState, firebase) => {
  //   const { password } = params;
  //   const fullName = `${firstName} ${lastName}`;
  dispatch(passwordUpdateRequest());
  return (
    firebase
      .auth()
      .updatePassword(password)
      // .then((res) => res.user.updateProfile({ displayName: fullName }))
      .then(() => dispatch(passwordUpdateSuccess()))
      .catch((e) => {
        dispatch(passwordUpdateError(e));
        throw e;
      })
  );
};

// logout
export const logout = () => (dispatch, getState, firebase) => {
  dispatch(logoutRequest());
  return firebase
    .auth()
    .signOut()
    .then(() => dispatch(logoutSuccess()))
    .then(() => dispatch(showCurrentUserSuccess(null)))
    .catch((e) => {
      dispatch(logoutError(e));
      throw e;
    });
};

// reset password
export const resetPassword = (email) => (dispatch, getState, firebase) => {
  dispatch(passwordResetRequest());
  return firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() =>
      dispatch(
        passwordResetSuccess(
          "Please check your inbox for further instructions!"
        )
      )
    )
    .catch((e) => {
      dispatch(passwordResetError(e.message));
      // throw e;
    });
};

export default authReducer;
