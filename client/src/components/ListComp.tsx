import React, { Component } from 'react'
import { isTemplateSpan } from 'typescript'
import SearchComp from './SearchComp'

interface Istate {
    isLoaded: boolean, 
    items: any[]
}

export class ListComp extends Component<{}, Istate> {
    constructor(props:any){
        super(props)
        this.state = {
            isLoaded: false, 
            items: []
        }
    }
    
    public componentDidMount() {
        fetch("http://127.0.0.1:5000/").then(res => res.json()).then( result => {
            this.setState({
                isLoaded: true, 
                items: [result]
            })
        })
    }
    
    render() {
        if (!this.state.isLoaded) {
            return <p>Loading...</p>
        } else {
            return (
                <div>
                    <SearchComp/>
                    <h1>LIST COMP</h1>
                    <p>Data has been loaded</p>
                    <ul>
                        {
                            this.state.items.map( (item, idx) => (
                                <li key={idx}>
                                    {item.results[0].building_name}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            )
        }
    }
}

export default ListComp
