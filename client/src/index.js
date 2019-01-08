import React from 'react';
import ReactDOM from 'react-dom';
import "./resources/css/styles.css"
import { BrowserRouter } from 'react-router-dom'
//redux imports
import { Provider } from 'react-redux'
import store from "./store/store";

import Routes from './Routes';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));