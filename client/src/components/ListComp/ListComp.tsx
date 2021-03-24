import React, { Component } from 'react'
import SearchComp from '../SearchComp/SearchComp'
import MaxMiniBLDGArea from '../UtilComp/MaxMiniBLDGArea'
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

    render() {
        const indexOfLastItem = this.state.currPage * this.state.itemsPerPage
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage
        const currItems = this.props.data.fixture.slice(indexOfFirstItem, indexOfLastItem)
        
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th><SearchComp/></th>
                        </tr>
                        <tr>
                            <td>
                                <ul>
                                    {
                                        currItems.map( (obj:any, idx:any) => (//[{},...,{}]
                                            <li key={idx}>
                                                <p onClick={()=>{
                                                    this.props.updateCoords({
                                                        lng: obj.longitude,
                                                        lat:obj.latitude
                                                    })
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

export default ListComp
