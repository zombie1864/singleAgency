import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {UPDATE_OBJ} from '../actions/index'
import {AppState} from '../store/store'
import React, { Component } from 'react'
import MaxMiniBLDGArea from './MaxMiniBLDGArea'
import {updateObjActionCreator} from '../types/appTypes'
import Pagination from './Pagination'
import {Ipayload} from '../types/appTypes'

interface Istate {
    currPage: number, 
    itemsPerPage: number, 
    searchTerm: string, 
    itemBackgroundColor: string, 
    selectedItem:number | null 
} 

const listCss:React.CSSProperties = {
    overflowY: "scroll", 
    height: "80vh",
    width: "500px", 
}

const addressCss:React.CSSProperties = {
    cursor:"pointer", 
    color: "darkblue", 
    textDecoration: "underline" , 
}

const searchCss:React.CSSProperties = { 
    margin: "20px"
}

interface IPropsFromStore {
    data: [] | Ipayload[], 
    obj: null | Ipayload, 
    updateObj: updateObjActionCreator
}

export class ListComp extends Component<IPropsFromStore, Istate> {
    constructor(props:any){
        super(props) 
        this.state = {
            currPage: 1, 
            itemsPerPage:5, 
            searchTerm: '',
            itemBackgroundColor: '', 
            selectedItem: null
        }
    }

    public componentDidUpdate(prevProps:any, prevState:Istate):void | null {
        return prevState.currPage !== this.state.currPage ? this.setState({...this.state, itemBackgroundColor: ''}) : null 
    }

    private paginate = (pageNumber:any) => this.setState({...this.state, currPage: pageNumber}) 

    private itemClicked = (idx:number):void => {
        this.setState({...this.state, itemBackgroundColor: "linear-gradient(#F4FF11, #85bed4)", selectedItem: idx})
    }

    render() {
        const indexOfLastItem = this.state.currPage * this.state.itemsPerPage
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage
        const currItems = this.props.data.slice(indexOfFirstItem, indexOfLastItem) 
          
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th> 
                                <input // search bar 
                                    className="form-control"
                                    type="text" 
                                    placeholder="search"
                                    style={searchCss}
                                    onChange={event=>{
                                        if (event.target.value !== '' ) {
                                            this.setState({...this.state, itemsPerPage: 100, searchTerm: event.target.value})

                                        } else if (event.target.value === '') {
                                            this.setState({currPage:1, itemsPerPage: 5, searchTerm: event.target.value}) 
                                        } 
                                    }}
                                    />
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <ul style={listCss} className="list-unstyled pl-5">
                                    {
                                        currItems.filter((obj:Ipayload):Ipayload | null => {
                                            return this.state.searchTerm === '' ? obj :
                                            obj.address.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ? obj : 
                                            obj.bdbid.toString().includes(this.state.searchTerm) ? obj : 
                                            obj.building_name.includes(this.state.searchTerm) ? obj : 
                                            obj.year_built.includes(this.state.searchTerm) ? obj : 
                                            obj.co2eui_breakdown.length === 0 && "no data".includes(this.state.searchTerm.toLowerCase()) ? obj : 
                                            obj.co2eui_breakdown.length !== 0 && obj.co2eui_breakdown[0].site_eui.toString().includes(this.state.searchTerm) ? obj : 
                                            obj.co2eui_breakdown.length !== 0 && obj.co2eui_breakdown[0].total_co2emissions_kg_site.toString().includes(this.state.searchTerm) ? obj : 
                                            null
                                        }).map( (obj:any, idx:any) => (//[{},...,{}]
                                            <li key={idx} style={{cursor:"pointer"}}>
                                                <div onClick={() => this.itemClicked(idx)}>
                                                    <span 
                                                        style={addressCss}
                                                        onClick={()=>{
                                                            this.props.updateObj(obj)
                                                        }}
                                                        className="alert alert-primary" 
                                                    >Address: {obj.address}</span>
                                                    <Link to={{
                                                        pathname: `/details/${obj.bdbid}`,
                                                        state: {
                                                            obj,
                                                        }
                                                    }}
                                                    >
                                                        <button
                                                            type="button" 
                                                            className="btn btn-info" 
                                                        >Details</button>
                                                    </Link>
                                                    <div style={{background: this.state.selectedItem === idx ? this.state.itemBackgroundColor : ""}}>
                                                        <p>bdbid: {obj.bdbid}</p>
                                                        <p>Building Name: {obj.building_name}</p>
                                                        <p>Year Built: {obj.year_built.slice(0,-2)}</p>
                                                        <p>Site EUI: {obj.co2eui_breakdown.length === 0 ? "no data" : obj.co2eui_breakdown[0].site_eui}</p>
                                                        <p>Total CO2 Emissions Kg site: {obj.co2eui_breakdown.length === 0 ? "no data" : Math.floor(obj.co2eui_breakdown[0].total_co2emissions_kg_site)} Kg</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>{
                                    this.state.searchTerm === '' ? 
                                    <Pagination 
                                        itemsPerPage={this.state.itemsPerPage}
                                        totalItems={this.props.data.length}
                                        paginate={this.paginate}
                                    /> : null 
                                }
                            </td>
                            <td>
                                <MaxMiniBLDGArea results={this.props.data}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

const msp = (state:AppState) => ({
    data: state.setDataReducer.results, 
    obj: state.setDataReducer.obj
})
    
const mdp =(dispatch:any) => ({
    updateObj: (payload:Ipayload) => {
        dispatch({
            type: UPDATE_OBJ,
            payload
        })
    }
})

export default connect( msp, mdp )(ListComp)
