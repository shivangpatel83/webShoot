import { useNavigate } from 'react-router-dom'
import './display.css'
import { useSelector } from 'react-redux'


export const Display=()=>{

    const dataSet = useSelector(state=>state.imageReducer.data)

    const navigate = useNavigate()

    return (
        <>
         <table className='usersTable'>
            <caption>Users List</caption>

            {
            dataSet.map((ele, index)=>
            <tr key={index+1}>
                <td className='imageContainer'>
                    <div className='imgSection'>
                    <img src={ele.photo} alt="img" />
                    </div>
                </td>
                <td>
                    <p className='id' >devide ID: {ele.deviceid.slice(0,10)}</p>
                    <p>lat: {ele.lat}</p>
                    <p>log: {ele.log}</p>
                </td>
            </tr>
            
        )}
         </table>
         <div className="routeBtn">
            <button onClick={()=>navigate('/')} className='back'>Add More</button>
         </div>
        </>
    )
}