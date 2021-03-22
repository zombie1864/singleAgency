import {fixture} from './storeType'
import {fetchDataActionCreator} from './actionCreatorTypes'

interface appPropType {
    fixture: fixture, 
    fetchData: fetchDataActionCreator
}

export default appPropType