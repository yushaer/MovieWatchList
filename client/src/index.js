import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
 
import "../src/style.scss";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';
import App from './App';
import Register from './routes/Register';

import Login from './routes/Login';
const store =createStore(reducers,{},compose( applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
ReactDOM.render(
 <Provider store={store} >  
<BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
</Provider>,
document.getElementById('root'));