import React, {Component} from 'react'
import GoogleMaps from '../components/GoogleMaps'
import ListComp from '../components/ListComp'

class HomePage extends Component{
  
  render() {
    const comps = [<GoogleMaps/>, <ListComp/>]
    
    return (
      <div className='tableCss'>
        <table className='tableCss'>
          <tbody>
            <tr>
              {comps.map( (comp, idx) => {
                return <td key={idx} className='trCss'>{comp}</td>
              })}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default HomePage
