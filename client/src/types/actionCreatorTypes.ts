import {fetchDataAction, updateCoordAction} from './actionTypes'

export type Ipayload = any

export type fetchDataActionCreator = () => fetchDataAction | void

export type updateCoordActionCreator = (payload:Ipayload) => updateCoordAction | void 