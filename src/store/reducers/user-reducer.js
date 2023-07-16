const INITIAL_STATE = {
  user: null,
};
export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_INFO":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
