import React, {Component} from 'react'
import GoogleMaps from '../components/GoogleMaps'
import ListComp from '../components/ListComp'

const tableCss:React.CSSProperties = {
  borderCollapse:'collapse',
  padding:'0 50px', 
  height:"90vh", 
  width:"100vw", 
}

class HomePage extends Component{
  
  render() {
    const comps = [<GoogleMaps/>, <ListComp/>]
    
    return (
      <div>
        <h2 className="text-center">Single Agency</h2>
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

export default HomePage;
