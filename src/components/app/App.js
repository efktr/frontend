import React, { Component } from 'react';
import logo from '../../logo.png';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { store, history } from '../../stores/index'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Link } from 'react-router-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Search from '../search/Search';
import SearchResults from '../searchResults/SearchResults';
import './App.css';
import Drug from '../drug/Drug';
import ADR from '../adverseDrugReaction/AdverseDrugReaction';
import BottomMenu from '../botttomMenu/BottomMenu'
import CombinedDrugs from '../combinedDrugs/CombinedDrugs'
import BodyImage from '../bodyImage/BodyImage'
import Predict from '../predict/Predict'


// Create theme based on primary color
const theme = getMuiTheme({
    palette: {
        primary1Color: "#c0646e",
    }
});

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

                        <MuiThemeProvider muiTheme={theme}>
                            <Search store={store}/>
                        </MuiThemeProvider>

                        <MuiThemeProvider muiTheme={theme}>
                            <div>
                                <Route exact path="/" component={(props) => <SearchResults {...props} store={store}/>}/>
                                <Route exact path="/drugs" component={(props) => <CombinedDrugs {...props} store={store}/>}/>
                                <Route path="/drug/:drugbankId" component={Drug}/>
                                <Route path="/adr/:umlsId" component={ADR}/>

                                {/*Modals*/}
                                <BodyImage />
                                <Predict />
                            </div>
                        </MuiThemeProvider>
                        <div style={{"paddingBottom":"2.5em"}}></div>
                        <MuiThemeProvider muiTheme={theme}>
                            <BottomMenu store={store} />
                        </MuiThemeProvider>
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;