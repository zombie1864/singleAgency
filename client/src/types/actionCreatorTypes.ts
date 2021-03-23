import {fetchDataAction, updateCoordAction} from './actionTypes'

export interface Ipayload {
    lng: number, 
    lat: number
}

export type fetchDataActionCreator = () => fetchDataAction | void

export type updateCoordActionCreator = (payload:Ipayload) => updateCoordAction | void 