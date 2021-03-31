import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class ErrPage extends Component {
    render() {
        return (
            <div>
                404 sorry! 
                <Link to={'/'}>
                    <button>
                        time to go home bud
                    </button>
                </Link>
            </div>
        )
    }
}

export default ErrPage
