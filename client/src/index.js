import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducer from './redux/reducer/reducer';
import { Provider } from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import axios from 'axios';

const store = configureStore({reducer})
axios.defaults.baseURL = "http://codecolosseummain-env.eba-ps6zbuu9.ap-northeast-2.elasticbeanstalk.com";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
