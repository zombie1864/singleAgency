import {fixture, Iobj} from './storeType'
import {fetchDataActionCreator,dispatchObjActionCreator} from './actionCreatorTypes'

interface PropsFromState {
    data: fixture, 
    obj: Iobj, 
    fetchData: fetchDataActionCreator, 
    updateObj: dispatchObjActionCreator
} // state shape of app 

export default PropsFromState