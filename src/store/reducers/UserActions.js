import {
  LOGIN,
  SAVE_USER_DATA,
  USER_PERSONAL_DATA,
  LOGOUT,
  ADD_WALLET,
  REMOVE_WALLET,
} from "./userDefinedActions";

export const LoginUser = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN, payload: { email, password } });
};
export const LogoutUser = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
export const addWallet = (wallet_info) => async (dispatch) => {
  dispatch({ type: ADD_WALLET, payload: { wallet_info } });
};

export const removeWallet = () => async (dispatch) => {
  dispatch({ type: REMOVE_WALLET });
};
