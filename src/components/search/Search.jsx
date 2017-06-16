import React, {Component} from 'react';
import './Search.css';
import { __API__, __AUTOCOMPLETE__, buildUrl } from './../../globals';
import AutoComplete from 'material-ui/AutoComplete';
import { get } from 'jquery';
import PubSub from 'pubsub-js';
import { push } from 'react-router-redux'


// FROM
// http://www.material-ui.com/#/components/auto-complete

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.onUpdateInput = this.onUpdateInput.bind(this);
        this.itemSelected = this.itemSelected.bind(this);
        this.state = {
            dataSource : [],
            inputValue : ''
        }
    }

    itemSelected(){
        this.props.store.dispatch(push('/?q=' + this.state.inputValue));
    }

    performSearch() {
        const self = this;
        const url = buildUrl([__API__, __AUTOCOMPLETE__ + "?q=" + self.state.inputValue]);

        if(this.state.inputValue !== '') {
            get(url, (data) => {
                let searchResults;

                searchResults = data.map(e => e.text);

                self.setState({
                    dataSource: searchResults
                });

                // Fire NEW_SEARCH only after autocomplete data has been fetched and processed
                PubSub.publish('NEW_SEARCH', self.state.inputValue);
            }).fail(() => {
                console.log("There was an error processing the request")
            });
        }
    }

    onUpdateInput = (inputValue) => {
        const self = this;
        this.setState({
            inputValue: inputValue
        }, () => {
            self.performSearch();
        });
    };

    render() {
        return <div className="searchContainer">
            <AutoComplete
                hintText="Drug or side effect"
                dataSource={this.state.dataSource}
                underlineFocusStyle={{borderColor: "#c0646e"}}
                filter={AutoComplete.caseInsensitiveFilter}
                onUpdateInput={this.onUpdateInput}
                onNewRequest={this.itemSelected}
            />
        </div>
    };
}