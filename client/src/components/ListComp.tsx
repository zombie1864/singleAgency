import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchData,UPDATE_OBJ} from '../actions/index'
import {AppState} from '../store/store'
import React, { Component } from 'react'
import MaxMiniBLDGArea from './MaxMiniBLDGArea'
import {PropsFromState} from '../types/appTypes'
import Pagination from './Pagination'
import {Ipayload} from '../types/appTypes'

interface Istate {
    currPage: number, 
    itemsPerPage: number, 
    searchTerm: string, 
    itemBackgroundColor: string, 
    selected:string 
} 

declare module 'react' {
    interface HTMLAttributes<T> extends DOMAttributes<T> {
        custom?: string // <-- custom interface
    }
}

const listCss:React.CSSProperties = {
    overflowY: "scroll", 
    height: "600px",
    width: "500px"
}

const addressCss:React.CSSProperties = {
    cursor:"pointer", 
    color: "darkblue", 
    textDecoration: "underline" , 
}

const searchCss:React.CSSProperties = { 
    margin: "20px"
}

export class ListComp extends Component<PropsFromState, Istate> {
    constructor(props:any){
        super(props) 
        this.state = {
            currPage: 1, 
            itemsPerPage:5, 
            searchTerm: '',
            itemBackgroundColor: '', 
            selected: ''
        }
    }

    public componentDidMount() {
        this.props.fetchData()
    }

    private paginate = (pageNumber:any) => this.setState({...this.state, currPage: pageNumber}) 

    private itemClicked = (idx:number):void => {
        console.log(idx);
        this.setState({...this.state, itemBackgroundColor: "linear-gradient(#F4FF11, #85bed4)", selected: `${idx}`})
    }

    render() {
        const indexOfLastItem = this.state.currPage * this.state.itemsPerPage
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage
        const currItems = this.props.data.slice(indexOfFirstItem, indexOfLastItem)
        
        return (
            <div>
                {
                    this.props.data.length === 1 ? <p>Error could not fetch data from server</p> : 
                    <table>
                    <tbody>
                        <tr>
                            <th> 
                                <input 
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
                        <tr >
                            <td>
                                <ul style={listCss} className="list-unstyled pl-5">
                                    {
                                        currItems.filter((obj:any) => {
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
                                                        state: obj
                                                    }}
                                                    >
                                                        <button
                                                            type="button" 
                                                            className="btn btn-info" 
                                                        >Details</button>
                                                    </Link>
                                                    <div style={{background: this.state.selected === `${idx}` ? "red" : ""}}>
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
                }
            </div>
        )

    }
}

const msp = (state:AppState) => ({
    data: state.setDataReducer.results, 
    obj: state.setDataReducer.obj
})
    
const mdp =(dispatch:any) => ({
    fetchData: () => dispatch(fetchData()), 
    updateObj: (payload:Ipayload) => {
        dispatch({
            type: UPDATE_OBJ,
            payload
        })
    }
})

export default connect( msp, mdp )(ListComp)
