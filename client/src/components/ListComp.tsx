import React, { Component } from 'react'
import SearchComp from './SearchComp'

export class ListComp extends Component {
    render() {
        return (
            <div>
                <SearchComp/>
                <h1>LIST COMP</h1>
                <p>hello</p>
            </div>
        )
    }
}

export default ListComp
