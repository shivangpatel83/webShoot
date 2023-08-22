import {all} from "redux-saga/effects"
import imageWatcher from "./sagaWatcher";

export default function* rootSaga(){
    yield all([imageWatcher()])
}