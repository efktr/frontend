import React, {Component} from 'react';
import { __API__ , __SEARCH__, buildUrl} from './../../globals';
import { get } from 'jquery';
import Result from './Result';
import PubSub from 'pubsub-js';
import {List} from 'material-ui/List';

export default class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            inputValue: '',
            items: 10
        };

        PubSub.subscribe('NEW_SEARCH', (message, data) => {
            this.setState({
                inputValue: data
            }, () => {
                this.performSearch();
            });
        });

        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            this.setState({
                items: (this.state.items + 10 > this.state.results.length ? this.state.results.length : this.state.items + 10)
            });
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    performSearch() {
        const self = this;
        const url = buildUrl([__API__, __SEARCH__ + "?q=" + self.state.inputValue]);

        if(this.state.inputValue !== '') {
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
                data={r}
                key={r.name + r.type}
            />;
        });
        return (
            <List>
                {results.slice(0, this.state.items)}
            </List>
        );
    };
}