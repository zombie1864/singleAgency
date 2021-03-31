import {Route,Switch} from 'react-router-dom'
import HomePage from './components/HomePage'
import DetailsPage from './components/DetailsPage'

const App = () => (
    <div>
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/details/:id" component={DetailsPage}/>
        </Switch>
    </div>
)

export default App 