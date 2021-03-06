import React, {Component} from 'react';
import {__API__ , __SEARCH__, buildUrl} from './../../globals';
import {get} from 'jquery';
import Result from './Result';
import PubSub from 'pubsub-js';
import {List} from 'material-ui/List';
import queryString from 'query-string';
import './SearchResults.css';

export default class SearchResults extends Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            inputValue: '',
            items: 10,
            query: queryString.parse(props.location.search)
        };

        this.handleScroll = this.handleScroll.bind(this);
        this.searchFromQuery = this.searchFromQuery.bind(this);
    }

    searchFromQuery(){
        let query = this.state.query.q;
        if(query !== null){
            this.performSearch(query);
        }
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= (docHeight - 10)) {
            this.setState({
                items: (this.state.items + 10 > this.state.results.length ? this.state.results.length : this.state.items + 10)
            });
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);

        this.subscription = PubSub.subscribe('NEW_SEARCH', (message, data) => {
            this.setState({
                inputValue: data
            }, () => {
                this.performSearch();
            });
        });

        this.searchFromQuery();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);

        PubSub.unsubscribe(this.subscription);
    }

    performSearch(query) {
        const self = this;
        query = query || this.state.inputValue;
        const url = buildUrl([__API__, __SEARCH__ + "?q=" + query]);

        if(query !== '') {
            get(url, (data) => {
                self.setState({
                    results: data,
                    items:10
                });
            });
        }
    }

    render() {
        let results = this.state.results.map(r => {
            return <Result
                {...this.props}
                data={r}
                key={r.name + r.type}
            />;
        });
        return (
            <List className="searchResultsContainer">
                {results.slice(0, this.state.items)}
            </List>
        );
    };
}