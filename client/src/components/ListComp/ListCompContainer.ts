import { connect } from 'react-redux'
import { fetchData } from '../../actions/fetchDataAction'
import ListComp from './ListComp'
import storeType from '../../types/storeType'

const msp = (state:storeType) => ({
    fixture: state.setDataReducer 
})

const mdp = (dispatch:any) => ({
    fetchData: () => dispatch(fetchData)
})

export default connect( msp, {} )(ListComp)