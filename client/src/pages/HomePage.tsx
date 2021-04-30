import React, {Component} from 'react'
import GoogleMaps from '../components/GoogleMaps'
import ListComp from '../components/ListComp'

const trCss:React.CSSProperties = {
  borderCollapse:'collapse',
}

const tableCss:React.CSSProperties = { // on large windows : aids in scaling  
  position:"absolute", 
  top: 0, 
  bottom: 0, 
  left: 0, 
  right: 0, 
  height:"100%", 
  width:"100%",
  overflow:"hidden"
}

class HomePage extends Component{
  
  render() {
    const comps = [<GoogleMaps/>, <ListComp/>]
    
    return (
      <div style={tableCss}>
        <table style={tableCss}>
          <tbody>
            <tr>
              {comps.map( (comp, idx) => {
                return <td key={idx}style={trCss}>{comp}</td>
              })}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default HomePage
