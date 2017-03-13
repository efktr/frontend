import React, { Component } from 'react';
import logo from '../../logo.png';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Search from '../search/Search'
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>

                <MuiThemeProvider>
                    <Search />
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
