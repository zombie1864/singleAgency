import { Dispatch } from 'react'
import {fetchDataActionCreator, setDataActionCreator,Ifixture,Ipayload,updateObjActionCreator} from '../types/appTypes'
export const FETCH_DATA = 'FETCH_DATA'
export const SET_DATA = "SET_DATA"
export const FETCH_ERR = "FETCH_ERR"
export const UPDATE_OBJ = 'UPDATE_OBJ'

// export const fetchDataRequest = () => ({
//     type: FETCH_DATA
// }) this can be used to display a loading indicator for large data 

export const fetchErrMsg = () => ({
    type: FETCH_ERR
})

export const setData:setDataActionCreator = (data:Ifixture) => ({
    type: SET_DATA, 
    results:data.results // data <=> {count:100, next:null, previous:null, results:(100)[{...},...,{...}]}
})

export const fetchData:fetchDataActionCreator = () => {
    return (dispatch:Dispatch<any>) => {
        // dispatch(fetchDataRequest()) // useful for loading 
        fetch("http://127.0.0.1:5000/")
        .then( (response:any) => {
            if (response.status === 200) {
                return response.json()
            } else {
                return dispatch(fetchErrMsg())
            }
        }).then(data =>{
            return data.type === FETCH_ERR ? null : dispatch(setData(data))
        }
        )
    }
} 

export const updateObj:updateObjActionCreator = (payload:Ipayload) => ({
    type: UPDATE_OBJ, 
    payload
})
