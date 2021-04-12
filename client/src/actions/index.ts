import { Dispatch } from 'react'
import {fetchDataActionCreator, setDataActionCreator,Ifixture,Ipayload,updateObjActionCreator} from '../types/appTypes'
export const FETCH_DATA = 'FETCH_DATA'
export const SET_DATA = "SET_DATA"
export const FETCH_ERR = "FETCH_ERR"
export const UPDATE_OBJ = 'UPDATE_OBJ'

export const setData:setDataActionCreator = (data:Ifixture) => ({
    type: SET_DATA, 
    results:data.results // data <=> {count:100, next:null, previous:null, results:(100)[{...},...,{...}]}
})

export const fetchData:fetchDataActionCreator = () => {
    return (dispatch:Dispatch<any>) => {
        fetch("http://127.0.0.1:5000/")
        .then( (response:any) => {
            return response.json()
        }).then(data =>{
            return dispatch(setData(data))
        }
        )
    }
} 

export const updateObj:updateObjActionCreator = (payload:Ipayload) => ({
    type: UPDATE_OBJ, 
    payload
})
