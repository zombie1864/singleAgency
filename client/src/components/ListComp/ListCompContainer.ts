import { connect } from 'react-redux'
import {SET_DATA} from '../../actions/fetchDataAction'
import {UPDATE_COORD} from '../../actions/updateCoordAction'
import ListComp from './ListComp'
import storeType from '../../types/storeType'

const msp = (state:storeType) => ({
    data: state.setDataReducer, 
    coord: state.setCoordReducer
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
    updateCoords: (payload:any) => {
        dispatch({
            type: UPDATE_COORD,
            payload
        })
    }
})

export default connect( msp, mdp )(ListComp)