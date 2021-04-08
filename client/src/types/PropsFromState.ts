import {fixture} from './storeType'
import {Ipayload} from './actionTypes'
import {fetchDataActionCreator,dispatchObjActionCreator} from './actionCreatorTypes'

interface PropsFromState {
    data: fixture, 
    obj: Ipayload, 
    fetchData: fetchDataActionCreator, 
    updateObj: dispatchObjActionCreator
} // state shape of app 

export default PropsFromState