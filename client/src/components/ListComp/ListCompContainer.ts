import { connect } from 'react-redux'
import { fetchData } from '../../actions/fetchDataAction'
import ListComp from './ListComp'

const msp = (state:any) => ({
    fixture: state.fixture 
})

const mdp = (dispatch:any) => ({
    fetchData: () => dispatch(fetchData)
})

export default connect( msp, mdp )(ListComp)