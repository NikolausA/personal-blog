import { ACTION_TYPE } from "../actions";

const initialPostState = {
  id: null,
  title: "",
  content: "",
  image: "",
  created: "",
  author: "",
  userId: null,
};

export const postReducer = (state = initialPostState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.SET_POST_DATA:
      return { ...state, ...payload };
    case ACTION_TYPE.DELETE_POST:
      return initialPostState;
    default:
      return state;
  }
};
