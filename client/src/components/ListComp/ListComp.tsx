import React, { Component } from 'react'
import SearchComp from '../SearchComp'
import appPropType from '../../types/appPropType'
import Pagination from './Pagination'

interface Istate {
    currPage: number, 
    itemsPerPage: number 
}

export class ListComp extends Component<appPropType, Istate> {
    constructor(props:any){
        super(props) 
        this.state = {
            currPage: 1, 
            itemsPerPage:10 
        }
    }

    public componentDidMount() {
        this.props.fetchData()
    }

    private paginate = (pageNumbers:any) => this.setState({...this.state, currPage: pageNumbers})
    
    render() {
        const indexOfLastItem = this.state.currPage * this.state.itemsPerPage
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage
        const currItems = this.props.fixture.fixture.slice(indexOfFirstItem, indexOfLastItem)
        return (
            <div>
                <SearchComp/>
                <h1>LIST COMP</h1>
                <ul>
                    {
                        currItems.map( (obj:any, idx:any) => (//[{},...,{}]
                            <li key={idx}>
                                {obj.address}
                                <p>bdbid: {obj.bdbid}</p>
                                <p>building name: {obj.building_name}</p>
                            </li>
                        ))
                    }
                </ul>
                <Pagination 
                    itemsPerPage={this.state.itemsPerPage}
                    totalItems={this.props.fixture.fixture.length}
                    paginate={this.paginate}
                />
            </div>
        )

    }
}

export default ListComp
