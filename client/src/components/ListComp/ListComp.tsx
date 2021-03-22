import React, { Component } from 'react'
import SearchComp from '../SearchComp'
import appPropType from '../../types/appPropType'

export class ListComp extends Component<appPropType> {

    public componentDidMount() {
        this.props.fetchData()
    }
    
    render() {
        console.log("inside ListComp", this.props.fixture.fixture);

        return (
            <div>
                <SearchComp/>
                <h1>LIST COMP</h1>
                <p>Data has been loaded:
                </p>
                <ul>
                    {
                        this.props.fixture.fixture.map( (obj:any, idx:any) => (//[{},...,{}]
                            <li key={idx}>
                                {obj.address}
                            </li>
                        ))
                    }
                </ul>
            </div>
        )

    }
}

export default ListComp
