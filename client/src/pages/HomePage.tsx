import React, {Component} from 'react'
import GoogleMaps from '../components/GoogleMaps'
import ListComp from '../components/ListComp'

const tableCss:React.CSSProperties = {
  borderCollapse:'collapse',
  padding:'0 20px', 
  height:"90vh", 
  width:"100vw", 
}

class HomePage extends Component{
  
  render() {
    const comps = [<GoogleMaps/>, <ListComp/>]
    
    return (
      <div>
        <table >
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
