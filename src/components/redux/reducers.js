
import { SET_DATA } from "./constants"

const initialState = {
    data : [],
}

export const imageReducer=(state =  initialState, action)=>{
    switch (action.type){
        case SET_DATA:
            return {
                ...state, data : [...state.data, action.payload]
           }
           default: return state
    }
}