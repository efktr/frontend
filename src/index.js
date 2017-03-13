import React from 'react';
import ReactDOM from 'react-dom';

// -------------------
//       Global imports
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
// --------------------


// -------------------
//       Initialise App
import App from './components/app/App';
ReactDOM.render(<App />, document.getElementById('root'));
// --------------------