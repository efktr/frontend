import React, { Component } from 'react';
import logo from '../../logo.png';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Search from '../search/Search';
import SearchResults from '../searchResults/SearchResults';
import './App.css';
import Drug from '../drug/Drug';
import ADR from '../adverseDrugReaction/AdverseDrugReaction';

import createHistory from 'history/createBrowserHistory'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { Route, Link } from 'react-router-dom';


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    combineReducers({
        router: routerReducer
    }),
    applyMiddleware(middleware)
);

class App extends Component {
    render() {
        return (
            <Provider store={store}>

                <ConnectedRouter history={history}>
                    <div className="App">
                        <div className="App-header">
                            <Link to="/">
                                <img src={logo} className="App-logo" alt="logo" />
                            </Link>
                        </div>

                        <MuiThemeProvider>
                            <Search store={store}/>
                        </MuiThemeProvider>

                        <MuiThemeProvider>
                            <div>
                                <Route exact path="/" component={SearchResults}/>
                                <Route path="/drug/:drugbankId" component={Drug}/>
                                <Route path="/adr/:umlsId" component={ADR}/>
                            </div>
                        </MuiThemeProvider>
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;