import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import reportWebVitals from './reportWebVitals';
import Application from './Application';
import { Provider } from 'react-redux';
import mainStore from './redux/store/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={mainStore}>
        <Application />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
