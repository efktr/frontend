import React, { Component } from 'react';
import logo from '../../logo.png';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Search from '../search/Search';
import SearchResults from '../searchResults/SearchResults';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Drug from '../drug/Drug';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="App-header">
                        <Link to="/">
                            <img src={logo} className="App-logo" alt="logo" />
                        </Link>
                    </div>

                    <MuiThemeProvider>
                        <Search />
                    </MuiThemeProvider>

                    <MuiThemeProvider>
                        <div>
                            <Route exact path="/" component={SearchResults}/>
                            <Route path="/drug/:drugbankId" component={Drug}/>
                        </div>
                    </MuiThemeProvider>
                </div>
            </Router>
        );
    }
}

export default App;