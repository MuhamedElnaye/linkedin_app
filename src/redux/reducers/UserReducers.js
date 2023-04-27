import * as actions from "../actions/ActionsType";
const intialState = {
  user: null,
};

const UserReducers = (state = intialState, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default UserReducers;
