import { myAxios } from "../axios";


export const setImageFun=async (input)=>{
    return await myAxios.post('/post', {
       task : input
   })
}

export const getImageFun=async ()=>{
    return await myAxios.get('/get')
}