import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import "../src/style.scss";
import 'bootstrap-icons/font/bootstrap-icons.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import App from './App';
const store =createStore(reducers,{},compose( applyMiddleware(thunk),window.devToolsExtension ? window.devToolsExtension() : f => f));
ReactDOM.render(
 <Provider store={store} >  
<App />
</Provider>,
document.getElementById('root'));