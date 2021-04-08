import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class ErrPage extends Component {
    render() {
        return (
            <div>
                404 Invalid request  
                <Link to={'/'}>
                    <button>
                        Click to go to Home page
                    </button>
                </Link>
            </div>
        )
    }
}

export default ErrPage
