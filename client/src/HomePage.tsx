import React, {Component} from 'react'
import {connect} from 'react-redux'
import GoogleMaps from './components/GoogleMaps'
import ListComp from './components/ListComp/ListComp'
import appPropType from './types/appPropType'
import storeType from './types/storeType'

const tableCss:React.CSSProperties = {
  borderCollapse:'collapse',
  border:'1px solid #000000',  
  padding:'0 50px', 
  height:"80vh", 
  width:"100vw"
}

class HomePage extends Component<appPropType>{
  
  render() {
    console.log(this.props);
    console.log(this.props.fixture);
    console.log(Object.values(this.props.fixture)[0]);
    const comps = [<GoogleMaps/>, <ListComp/>]
    return (
      <div className="HomePage">
        <h2>Single Agency</h2>
        <table>
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

const msp = (state:storeType) => ({
  fixture: state.setDataReducer
})

export default connect(msp, {})(HomePage);
