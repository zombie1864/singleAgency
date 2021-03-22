import { connect } from 'react-redux'
import {SET_DATA} from '../../actions/fetchDataAction'
import ListComp from './ListComp'
import storeType from '../../types/storeType'

const msp = (state:storeType) => ({
    fixture: state.setDataReducer 
})

const mdp = (dispatch:any) => ({
    // fetchData: () => dispatch(fetchData),
    fetchData: () => { 
        fetch("http://127.0.0.1:5000/")
            .then( (response:any) => {
                return response.json()
            })
            .then( (data:any) => {
                dispatch({type: SET_DATA, fixture:data.results})
            })
    }
})

export default connect( msp, mdp )(ListComp)