import React, {Component} from 'react'
import {connect} from 'react-redux'
import GoogleMaps from './components/MapComp/GoogleMapContainer'
import ListComp from './components/ListComp/ListCompContainer'
import PropsFromState from './types/PropsFromState'
import storeType from './types/storeType'
import {fetchData} from './actions/fetchDataAction'
import {updateCoords} from './actions/updateCoordAction'

const tableCss:React.CSSProperties = {
  borderCollapse:'collapse',
  border:'1px solid #000000',  
  padding:'0 50px', 
  height:"80vh", 
  width:"100vw"
}

interface connectDispatchProps{ 
  fetchData: any, 
  updateCoords: any 
}

type props = PropsFromState & connectDispatchProps

class HomePage extends Component<props>{
  
  render() {
    const comps = [<GoogleMaps/>, <ListComp/>]
    console.log('homePage', this.props.coord);
    
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
  data: state.setDataReducer, 
  coord: state.setCoordReducer
})

export default connect(msp, {fetchData, updateCoords})(HomePage);
