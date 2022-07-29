import { ADD_WALLET, REMOVE_WALLET, LOGIN, LOGOUT } from "./userDefinedActions";
const states = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: { email: action.payload.email } };
    case LOGOUT: {
      delete state["user"];
      return { ...state };
    }
    case ADD_WALLET:
      return { ...state, wallet_info: action.payload.wallet_info };
    case REMOVE_WALLET:
      delete state["wallet_info"];

      return { ...state };
    default:
      return state;
  }
};

export default states;
