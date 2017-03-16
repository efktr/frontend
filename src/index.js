import React from 'react';
import ReactDOM from 'react-dom';
import {__API__} from './globals';

// -------------------
//       Global imports
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
// --------------------

// -------------------
//       Global logs
console.log("API AT: ", __API__);
// -------------------


// -------------------
//       Initialise App
import App from './components/app/App';
ReactDOM.render(<App />, document.getElementById('root'));
// --------------------