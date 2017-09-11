import drugs from './drugs'
import { createStore , combineReducers, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createSession } from 'redux-session';


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Session namespace ==> Keep data across sessions
const session = createSession({
    ns: 'efktr',
    selectState (state) {
        return {
            drugs: state.drugs
        };
    }
});

const store  = createStore(
    combineReducers({
        drugs: drugs,
        router: routerReducer,
    }),
    applyMiddleware(middleware, session)
);

export { store, history };