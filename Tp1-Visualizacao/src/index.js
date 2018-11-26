import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
//import Routes from './components/config/Routes';
import * as serviceWorker from './serviceWorker';
import { Todos } from './components/ui/TpMain';

ReactDOM.render(<Todos />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
