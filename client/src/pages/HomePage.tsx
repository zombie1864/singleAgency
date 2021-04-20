import React, {Component} from 'react'
// import { connect } from 'react-redux'
import GoogleMaps from '../components/GoogleMaps'
import ListComp from '../components/ListComp'
// import { AppState } from '../store/store'

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

// const msp = (state:AppState) => ({
//   data: state.setDataReducer.results, 
//   obj: state.setDataReducer.obj
// })

// export default connect(msp, null)(HomePage)
export default HomePage
