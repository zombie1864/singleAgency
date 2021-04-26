import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {UPDATE_OBJ} from '../actions/index'
import {AppState} from '../store/store'
import React, { Component } from 'react'
import {updateObjActionCreator} from '../types/appTypes'
import Pagination from './Pagination'
import {Ipayload} from '../types/appTypes'

interface Istate {
    currPage: number, 
    itemsPerPage: number, 
    searchTerm: string, 
    itemBackgroundColor: string, 
    selectedItem:number | null ,
    hoverOnIdx: string | null, 
    hover: boolean
} 

interface ImaxMiniInfo {
    maxArea: number,
    minArea: number,
    maxIdx: number,
    minIdx: number
}

const listCompCss:React.CSSProperties = {
    overflowY: "scroll", height: "80vh",
}

const addressCss:React.CSSProperties = {
    cursor:"pointer", 
    color: "darkblue", 
    textDecoration: "underline" , 
}

const ulCss:React.CSSProperties = {
    position: "absolute", 
    top: "35vh",  
    left: "47.5vw",
    display: "inline-flex", 
    listStyle: 'none', 
    cursor: "pointer",
}

interface IPropsFromStore {
    data: [] | Ipayload[], 
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
            selectedItem: null, 
            hoverOnIdx: null, 
            hover: false
        }
    }

    private BLDGAddress = (idx:number): null | string => this.props.data[idx] === undefined ? null : this.props.data[idx].address // returns building address 

    private maxMinTotalBLDGArea = (data:Ipayload[]):ImaxMiniInfo => { // returns the max or min BLDG area and index location 
        const arrOfNumbers = data.map( (obj:Ipayload) => obj.total_bldg_gross_sq_ft ) 
        return {
            maxArea: Math.max(...arrOfNumbers), // Math.max(...arrOfNumbers)
            minArea: Math.min.apply(null, arrOfNumbers.filter((number:number) => number !== 0 )),
            maxIdx: arrOfNumbers.indexOf(Math.max(...arrOfNumbers)),
            minIdx: arrOfNumbers.indexOf(Math.min.apply(null, arrOfNumbers.filter((number:number) => number !== 0 )))
        }
    }

    private toggleHover = (event:any):void => {
        (this.state.hoverOnIdx !== null) && (this.state.hoverOnIdx !== event.target.className) ? this.setState({hoverOnIdx: event.target.className, hover: true}) :
        this.setState({hoverOnIdx: event.target.className, hover: !this.state.hover}) 
    }

    private renderMaxMinBLDGInfo = ():JSX.Element[] => {
        const maxMiniInfo = this.maxMinTotalBLDGArea(this.props.data)
        const volumeBLDGInfoText = ['Biggest Building info', 'Smallest Building info']
        const BLDGSubInfoText = ['Building Area', 'Building Address']
        
        return (
            volumeBLDGInfoText.map( (volumeTypeText:string, outterIdx:number) => {
                const volumeTypeTextStyling:React.CSSProperties = {
                    position: "relative",
                    left: "85%",
                    backgroundColor: (this.state.hoverOnIdx === `${outterIdx}` && this.state.hover) ? " #add8e6" :'#d86969', 
                    width: "15vw", 
                    borderRadius: '5px', 
                    display: "block",
                    padding: "10px 30px",
                }

                const subInfoTextStyling:React.CSSProperties = {
                    position: "relative",
                    left: "85%",
                    display: (this.state.hoverOnIdx === `${outterIdx}` && this.state.hover) ? "block" : "none", 
                    marginTop: '50px', 
                    width: "15vw",
                    background: '#0f84e8',
                    borderRadius: '5px',
                    color: "white", 
                }
                
                return (
                    <div key={outterIdx} style={{width: "45%", padding: "10px 3vw",}}>
                        <li style={volumeTypeTextStyling} className={`${outterIdx}`} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>{volumeTypeText}</li> 
                        {BLDGSubInfoText.map( (subInfoText:string, innerIdx:number) => {
                            return (
                                <li key={innerIdx} style={subInfoTextStyling}>{subInfoText} : {
                                    outterIdx === 0 && innerIdx === 0 ? maxMiniInfo.maxArea : 
                                    outterIdx === 1 && innerIdx === 0 ? maxMiniInfo.minArea : 
                                    outterIdx === 0 && innerIdx === 1 ? this.BLDGAddress( maxMiniInfo.maxIdx ): this.BLDGAddress( maxMiniInfo.minIdx )} {innerIdx === 0 ? 'sq ft' : null
                                    }
                                </li>
                            )
                        })}
                    </div>
                )
            })
        )
    }

    public componentDidUpdate = (prevProps:any, prevState:Istate):void | null => prevState.currPage !== this.state.currPage ? this.setState({itemBackgroundColor: ''}) : null 

    private paginate = (pageNumber:number):void => this.setState({currPage: pageNumber}) 

    private itemClicked = (obj:Ipayload, idx:number):void => {
        this.props.updateObj(obj)
        return this.setState({itemBackgroundColor: "linear-gradient(#F4FF11, #85bed4)", selectedItem: idx})
    }

    private filterSearchResult = ():Ipayload[] => {
        const indexOfLastItem = this.state.currPage * this.state.itemsPerPage
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage
        const currItems = this.props.data.slice(indexOfFirstItem, indexOfLastItem) 
        const searchTerm = this.state.searchTerm.toLowerCase()

        return currItems.filter((obj:Ipayload):Ipayload | null => {
            return this.state.searchTerm === '' ? obj :
            obj.address.toLowerCase().includes( searchTerm ) ? obj : 
            obj.bdbid.toString().includes(this.state.searchTerm) ? obj : 
            obj.building_name.toLowerCase().includes( searchTerm ) ? obj : 
            obj.year_built.includes(this.state.searchTerm) ? obj : 
            obj.co2eui_breakdown.length === 0 && "no data".includes( searchTerm ) ? obj : 
            obj.co2eui_breakdown.length !== 0 && obj.co2eui_breakdown[0].site_eui.toString().includes(this.state.searchTerm) ? obj : 
            obj.co2eui_breakdown.length !== 0 && obj.co2eui_breakdown[0].total_co2emissions_kg_site.toString().includes(this.state.searchTerm) ? obj : 
            null
        })
    }
    private selectedItemCSS = (idx:number):React.CSSProperties => {
        return { background: this.state.selectedItem === idx ? this.state.itemBackgroundColor : "" }
    }

    render() {         
        return (
            <div>
                <table style={{width:"75vw"}}>
                    <tbody>
                        <tr>
                            <th> 
                                <input // search bar 
                                    className="form-control"
                                    type="text" 
                                    placeholder="search"
                                    style={{margin: "20px", width: "30vw",}}
                                    onChange={event=>{
                                        if (event.target.value !== '' ) {
                                            this.setState({itemsPerPage: 100, searchTerm: event.target.value})
                                        } else if (event.target.value === '') {
                                            this.setState({currPage:1, itemsPerPage: 5, searchTerm: event.target.value}) 
                                        } 
                                    }}
                                    />
                            </th>
                        </tr>
                        <tr>
                            <td style={{width: "30vw",}}>
                                <ul style={listCompCss} className="list-unstyled pl-5">
                                    { this.filterSearchResult().map( (obj:Ipayload, idx:number) => (//[{},...,{}]
                                            <li key={idx} style={{cursor:"pointer",}} onClick={()=>this.itemClicked(obj, idx)}>
                                                <div>
                                                    <span className="alert alert-primary" style={addressCss}>Address: {obj.address}</span>
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
                                                    <div style={this.selectedItemCSS(idx)}>
                                                        <p>bdbid: {obj.bdbid}</p>
                                                        <p>Building Name: {obj.building_name}</p>
                                                        <p>Year Built: {obj.year_built.slice(0,-2)}</p>
                                                        <p>Site EUI: {obj.co2eui_breakdown.length === 0 ? "no data" : obj.co2eui_breakdown[0].site_eui}</p>
                                                        <p>Total CO2 Emissions Kg site: {obj.co2eui_breakdown.length === 0 ? "No Data" : `${
                                                            Math.floor(obj.co2eui_breakdown[0].total_co2emissions_kg_site)
                                                        } Kg` }</p>
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
                                <h5 style={{position:"relative", bottom:"25vh", textAlign:"center"}}>Hover over to show more information</h5>
                                <div style={{textAlign: "center",}}>
                                    <ul style={ulCss}>
                                        {this.renderMaxMinBLDGInfo()}
                                    </ul>
                                </div>
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
