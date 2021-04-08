import {fetchDataAction, dispatchObjAction, Ipayload} from './actionTypes'

export type fetchDataActionCreator = () => fetchDataAction 

export type dispatchObjActionCreator = (payload:Ipayload) => dispatchObjAction 