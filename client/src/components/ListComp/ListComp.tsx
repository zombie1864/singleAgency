import React, { Component } from 'react'
import SearchComp from '../SearchComp'
import PropsFromState from '../../types/PropsFromState'
import Pagination from './Pagination'

interface Istate {
    currPage: number, 
    itemsPerPage: number 
}

interface connectDispatchProps{ 
    fetchData: any, 
    updateCoords: any 
}

type Allprops = PropsFromState & connectDispatchProps

export class ListComp extends Component<Allprops, Istate> {
    constructor(props:any){
        super(props) 
        this.state = {
            currPage: 1, 
            itemsPerPage:5 
        }
    }

    public componentDidMount() {
        this.props.fetchData()
    }

    private paginate = (pageNumbers:any) => this.setState({...this.state, currPage: pageNumbers})

    private showLngAndLat = (latitude:number, longitude:number):any => { 
        // console.log('lat: ' + latitude, 'lon: ' + longitude)
    } 
    
    render() {
        const indexOfLastItem = this.state.currPage * this.state.itemsPerPage
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage
        const currItems = this.props.data.fixture.slice(indexOfFirstItem, indexOfLastItem)
        console.log(this.props.data.fixture[0])
        console.log(this.props.updateCoords.payload);
        console.log("coord", this.props.coord);
        
        
        return (
            <div>
                <SearchComp/>
                <h1>LIST COMP</h1>
                <ul>
                    {
                        currItems.map( (obj:any, idx:any) => (//[{},...,{}]
                            <li key={idx}>
                                <p onClick={()=>{
                                    const payload = {lng: obj.longitude,lat:obj.latitude}
                                    this.props.updateCoords(payload)
                                    console.log(payload);
                                    // console.log(
                                    // 'lat: ' + obj.latitude, 'lon: ' + obj.longitude
                                    // )
                                }}>Address: {obj.address}</p>
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
            </div>
        )

    }
}

export default ListComp
