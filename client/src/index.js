import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
 
import "../src/style.scss";

import 'aos/dist/aos.css';
import App from './App';
import WatchList from './components/WatchList';

//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store =createStore(reducers,{},compose( applyMiddleware(thunk)));
ReactDOM.render(
 <Provider store={store} >  
<App/>
</Provider>,
document.getElementById('root'));