import { GET_DATA, SET_DATA } from "./constants"



export const addImage=(data)=>{
    return {
        type : SET_DATA,
        payload: data
    }
}
