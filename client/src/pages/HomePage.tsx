import React, {Component} from 'react'
import GoogleMaps from '../components/GoogleMaps'
import ListComp from '../components/ListComp'

const tableCss:React.CSSProperties = {
  borderCollapse:'collapse',
}

class HomePage extends Component{
  
  render() {
    const comps = [<GoogleMaps/>, <ListComp/>]
    
    return (
      <div>
        <table style={{position:"absolute", top: 0, bottom: 0, left: 0, right: 0, height:"100%", width:"100%", overflow: 'hidden'}}>
          <tbody>
            <tr>
              {comps.map( (comp, idx) => {
                return <td key={idx}style={tableCss}>{comp}</td>
              })}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default HomePage
