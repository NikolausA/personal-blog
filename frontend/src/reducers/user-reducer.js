import { ACTION_TYPE } from "../actions";

const initialUserState = {
  id: null,
  userName: null,
};

export const userReducer = (state = initialUserState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.SET_USER:
      return { ...state, ...payload };
    case ACTION_TYPE.LOGOUT:
      return initialUserState;
    default:
      return state;
  }
};
