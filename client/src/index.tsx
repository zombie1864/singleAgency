import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import { Provider } from 'react-redux' 
import store from './store/store'

ReactDOM.render(
  <Provider store={store}> 
    <HomePage />
  </Provider>,
  document.getElementById('root')
);
