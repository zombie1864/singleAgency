import {fetchDataAction, updateCoordAction} from './actionTypes'

export type Ipayload = {
    lat:number, 
    lng:number 
}

export type fetchDataActionCreator = () => fetchDataAction 

export type updateCoordActionCreator = (payload:Ipayload) => updateCoordAction 