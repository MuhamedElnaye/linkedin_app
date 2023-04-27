import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import CombineReducers from "../reducers/ComineReducers";

const Store = createStore(CombineReducers, applyMiddleware(reduxThunk));

export default Store;
