import { connect } from 'react-redux'
import {SET_DATA} from '../../actions/fetchDataAction'
import ListComp from './ListComp'
import storeType from '../../types/storeType'
import {updateCoords} from '../../actions/updateCoordAction'

const msp = (state:storeType) => ({
    data: state.setDataReducer, 
    coord: state.coord
})

const mdp = (dispatch:any) => ({
    fetchData: () => { 
        fetch("http://127.0.0.1:5000/")
            .then( (response:any) => {
                return response.json()
            })
            .then( (data:any) => {
                dispatch({type: SET_DATA, fixture:data.results})
            })
    }, 
    updateCoords
})

export default connect( msp, mdp )(ListComp)