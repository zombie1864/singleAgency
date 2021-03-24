import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Provider } from 'react-redux' 
import {BrowserRouter as Router} from 'react-router-dom'
import store from './store/store'

ReactDOM.render(
  <Provider store={store}> 
    <Router>
      <App/> 
    </Router>
  </Provider>,
  document.getElementById('root')
);

// provider, provide HomePage with the store. All comp inside have access to the store 