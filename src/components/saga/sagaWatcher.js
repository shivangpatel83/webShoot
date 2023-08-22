import { GET_DATA, SET_DATA } from "../redux/constants";
import {put,call} from "redux-saga/effects"
import {takeEvery} from "redux-saga/effects"
import { REQUEST_FAILED, REQUEST_PENDING, REQUEST_SUCCESS } from "./sagaConstants";
import { setImageFun, getImageFun } from "./sagaApi"


function* addImage(action){
    try {
            yield put({type: REQUEST_PENDING})
           const response = yield call(setImageFun, action.payload)
            yield put({type: REQUEST_SUCCESS, payload: response.data})
    }catch(e){
        yield put({type: REQUEST_FAILED, payload: e})
    }
}

function* getAllImages(){
    try {
            yield put({type: REQUEST_PENDING})
           const response = yield call(getImageFun)
            yield put({type: REQUEST_SUCCESS, payload: response.data})
    }catch(e){
        yield put({type: REQUEST_FAILED, payload: e})
    }
}

export default function* imageWatcher(){
    yield takeEvery(SET_DATA, addImage);
    yield takeEvery(GET_DATA, getAllImages);
  
}