import {combineReducers} from "redux";
import { imageReducer } from "./redux/reducers";

export const rootReducer =
    combineReducers(
    {
     imageReducer
    }
)