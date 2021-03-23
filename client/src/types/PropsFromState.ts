import {fixture, Icoord} from './storeType'
import {fetchDataActionCreator, updateCoordActionCreator} from './actionCreatorTypes'

interface PropsFromState {
    data: fixture, 
    coord: Icoord, 
    fetchData: fetchDataActionCreator, 
    updateCoords: updateCoordActionCreator
}

export default PropsFromState