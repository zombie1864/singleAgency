import React, { Component } from 'react'
import {Route,Switch} from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailsPage from './pages/DetailsPage'
import ErrPage from './pages/404Page'
import { AppState } from './store/store'
import {fetchData} from './actions/index'
import { PropsFromState } from './types/appTypes'
import { connect } from 'react-redux'
import './styles/index.css'

type Allprops = PropsFromState & any 

class App extends Component<Allprops>{

    public componentDidMount() {
        this.props.fetchData()
    }

    render() {
        return (
            <div className='appCss'>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/details/:id" component={DetailsPage}/>
                    <Route path="*" component={ErrPage}/>
                </Switch>
            </div>

        )
    }
}

const msp = (state:AppState) => ({
    data: state.setDataReducer.results,
})

const mdp = (dispatch:any) => ({
    fetchData: () => dispatch(fetchData()), 
})

export default connect(msp, mdp)(App)
