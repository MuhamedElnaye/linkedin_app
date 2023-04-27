import * as actions from "../actions/ActionsType";
export const intialState = {
  loading: false,
  articles: [],
};

const ArticlesReducer = (state = intialState, action) => {
  switch (action.type) {
    case actions.SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.status,
      };
    case actions.GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    default:
      return state;
  }
};

export default ArticlesReducer;
