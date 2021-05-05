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
    display: "inline-flex", 
    listStyle: 'none', 
    cursor: "pointer", 
    padding: "0 0",
    width:"100%",
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

    private renderMaxMinBLDGInfo = ():JSX.Element[] => {
        const maxMiniInfo = this.maxMinTotalBLDGArea(this.props.data)
        const volumeBLDGInfoText = ['Biggest Building info', 'Smallest Building info']
        const BLDGSubInfoText = ['Building Area', 'Building Address']
        
        return (
            volumeBLDGInfoText.map( (volumeTypeText:string, outterIdx:number) => {
                const volumeTypeTextStyling:React.CSSProperties = {
                    width: "13vw", 
                    borderRadius: '5px', 
                    display: "block",
                    padding: "10px 30px",
                }

                const subInfoTextStyling:React.CSSProperties = {
                    marginTop: '50px', 
                    width: "13vw",
                    background: '#0f84e8',
                    borderRadius: '5px',
                    color: "white", 
                }
                
                return (
                    <div key={outterIdx} style={{width: "45%", padding: "10px 1.9vw",}}>
                        <li style={volumeTypeTextStyling} className={`outterItem${outterIdx}`}>{volumeTypeText}</li> 
                        {BLDGSubInfoText.map( (subInfoText:string, innerIdx:number) => {
                            return (
                                <li key={innerIdx} style={subInfoTextStyling} className={`innerItem${innerIdx}`}>{subInfoText} : {
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

    private paginate = (pageNumber:number):void => this.setState({currPage: pageNumber}) 

    private itemClicked = (obj:Ipayload, idx:number):void => {
        this.props.updateObj(obj)
    }

    private filterSearchResult = ():Ipayload[] => {
        const {currPage, itemsPerPage, searchTerm} = this.state
        const indexOfLastItem = currPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const currItems = this.props.data.slice(indexOfFirstItem, indexOfLastItem) 

        return currItems.filter((obj:Ipayload):Ipayload | null => {
            return searchTerm === '' ? obj :
            obj.address.toLowerCase().includes( searchTerm.toLowerCase() ) ? obj : 
            obj.bdbid.toString().includes(searchTerm) ? obj : 
            obj.building_name.toLowerCase().includes( searchTerm.toLowerCase() ) ? obj : 
            obj.year_built.includes(searchTerm) ? obj : 
            obj.co2eui_breakdown.length === 0 && "no data".includes( searchTerm.toLowerCase() ) ? obj : 
            obj.co2eui_breakdown.length !== 0 && obj.co2eui_breakdown[0].site_eui.toString().includes(searchTerm) ? obj : 
            obj.co2eui_breakdown.length !== 0 && obj.co2eui_breakdown[0].total_co2emissions_kg_site.toString().includes(searchTerm) ? obj : 
            null
        })
    }

    private searchBarOnChangeHandler = (event:any):void => {
        if (event.target.value !== '' ) {
            this.setState({itemsPerPage: 5, searchTerm: event.target.value})
        } else if (event.target.value === '') {
            this.setState({currPage:this.state.currPage, itemsPerPage: 5, searchTerm: event.target.value}) 
        } 
    }

    render() {
        
        return (
            <div data-test="ListComp">
            <table style={{width:"75vw",}}>
                <tbody>
                    <tr>
                        <th> 
                            <input // search bar 
                                className="form-control"
                                type="text" 
                                placeholder="search"
                                style={{margin: "20px", width: "30vw",}}
                                onChange={this.searchBarOnChangeHandler}
                                />
                        </th>
                    </tr>
                    <tr>
                        <td style={{width: "30vw",}}>
                            <ul style={listCompCss} className="list-unstyled pl-5">
                                { this.filterSearchResult().length === 0 ? "No Results" : this.filterSearchResult().map( (obj:Ipayload, idx:number) => (//[{},...,{}]
                                        <li key={idx} style={{cursor:"pointer",}} onClick={()=>this.itemClicked(obj, idx)} tabIndex={idx}>
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
                                            <div>
                                            <p>bdbid: {obj.bdbid}</p>
                                            <p>Building Name: {obj.building_name}</p>
                                            <p>Year Built: {obj.year_built.slice(0,-2)}</p>
                                            <p>Site EUI: {obj.co2eui_breakdown.length === 0 ? "no data" : obj.co2eui_breakdown[0].site_eui}</p>
                                            <p>Total CO2 Emissions Kg site: {obj.co2eui_breakdown.length === 0 ? "No Data" : `${
                                                Math.floor(obj.co2eui_breakdown[0].total_co2emissions_kg_site)
                                            } Kg` }</p>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            <span>
                                { 
                                    <Pagination 
                                    itemsPerPage={this.state.itemsPerPage}
                                    totalItems={this.props.data.length}
                                    paginate={this.paginate} // function prop
                                    searchTerm={this.state.searchTerm}
                                    currPageForSearchTerm={this.state.searchTerm === '' ? null : this.state.currPage}
                                    noResultFromSearch={this.state.searchTerm === '' ? null : this.filterSearchResult().length}
                                    currPage={this.state.currPage}
                                    />
                                }
                            </span>
                        </td>
                        <td style={{width: "35vw",}}> 
                            <h5 style={{position:"relative", bottom:"25vh", textAlign:"center", width:"33vw",}}>Hover over to show more information</h5>
                            <div style={{textAlign: "center", position:"absolute", top:"40vh",}}>
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
