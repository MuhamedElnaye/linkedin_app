import { combineReducers } from "redux";
import UserReducers from "./UserReducers";
import ArticlesReducer from "./ArticlesReducer";

const CombineReducers = combineReducers({
  userState: UserReducers,
  articlesState: ArticlesReducer,
});

export default CombineReducers;
