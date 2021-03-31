import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {SET_DATA} from '../../actions/fetchDataAction'
import {UPDATE_COORD} from '../../actions/updateCoordAction'
import storeType from '../../types/storeType'
import React, { Component } from 'react'
import MaxMiniBLDGArea from '../UtilComp/MaxMiniBLDGArea'
import PropsFromState from '../../types/PropsFromState'
import Pagination from './Pagination'

interface Istate {
    currPage: number, 
    itemsPerPage: number, 
    searchTerm: string
}

interface connectDispatchProps{ 
    fetchData: any, 
    updateCoords: any 
}

type Allprops = PropsFromState & connectDispatchProps

const searchCss:React.CSSProperties = {
    overflowY: "scroll", 
    height: "600px",
    width: "500px"
}

const addressCss:React.CSSProperties = {
    cursor:"pointer", 
    color: "darkblue", 
    textDecoration: "underline" , 
}

export class ListComp extends Component<Allprops, Istate> {
    constructor(props:any){
        super(props) 
        this.state = {
            currPage: 1, 
            itemsPerPage:5, 
            searchTerm: ''
        }
    }

    public componentDidMount() {
        this.props.fetchData()
    }

    private paginate = (pageNumber:any) => this.setState({...this.state, currPage: pageNumber}) 

    render() {
        const indexOfLastItem = this.state.currPage * this.state.itemsPerPage
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage
        const currItems = this.props.data.fixture.slice(indexOfFirstItem, indexOfLastItem)
        
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th> {/* search feature */}
                                <input 
                                className="form-control"
                                    type="text" 
                                    placeholder="search"
                                    onChange={event=>{
                                        if (event.target.value !== '' ) {
                                            this.setState({...this.state, itemsPerPage: 100, searchTerm: event.target.value})

                                        } else if (event.target.value === '') {
                                            this.setState({currPage:1, itemsPerPage: 5, searchTerm: event.target.value}) 
                                        } 
                                    }}
                                    />
                                    <br/><br/><br/>  {/* PLACEHOLDER */}
                            </th>
                        </tr>
                        <tr >
                            <td>
                                <ul style={searchCss}>
                                    {
                                        currItems.filter((obj:any) => {
                                            return this.state.searchTerm === '' ? obj :
                                            obj.address.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ? obj : 
                                            null
                                        }).map( (obj:any, idx:any) => (//[{},...,{}]
                                            <li key={idx}>
                                                <div>
                                                    <span 
                                                        style={addressCss}
                                                        onClick={()=>{
                                                            this.props.updateCoords({
                                                                lng: obj.longitude,
                                                                lat:obj.latitude
                                                            })
                                                        }}
                                                        className="alert alert-primary" 
                                                    >Address: {obj.address}</span>
                                                    <Link to={{
                                                        pathname: `/details/${obj.bdbid}`,
                                                        state: obj
                                                    }}
                                                    >
                                                        <button
                                                            type="button" 
                                                            className="btn btn-info" 
                                                        >Details</button>
                                                    </Link>
                                                </div>
                                                <p>bdbid: {obj.bdbid}</p>
                                                <p>building name: {obj.building_name}</p>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <Pagination 
                                    itemsPerPage={this.state.itemsPerPage}
                                    totalItems={this.props.data.fixture.length}
                                    paginate={this.paginate}
                                />
                            </td>
                            <td>
                                <MaxMiniBLDGArea fixture={this.props.data.fixture}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )

    }
}

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
