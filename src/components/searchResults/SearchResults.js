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
            inputValue: ''
        };

        PubSub.subscribe('NEW_SEARCH', (message, data) => {
            this.setState({
                inputValue: data
            }, () => {
                this.performSearch();
            });
        });
    }

    performSearch() {
        const self = this;
        const url = buildUrl([__API__, __SEARCH__ + "?q=" + self.state.inputValue]);

        if(this.state.inputValue !== '') {
            get(url, (data) => {
                self.setState({
                    results: data
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
                {results.slice(0,10)}
            </List>
        );
    };
}