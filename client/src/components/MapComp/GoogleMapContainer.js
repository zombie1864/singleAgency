import {connect} from 'react-redux'
import {GoogleApiWrapper} from 'google-maps-react';
import {MapContainer} from './GoogleMaps'
import storeType from '../../types/storeType'
import key from './GKey'

const msp = (state) => ({
    coord: state.setCoordReducer
})

export default connect(msp, null)(GoogleApiWrapper({apiKey: key})(MapContainer))