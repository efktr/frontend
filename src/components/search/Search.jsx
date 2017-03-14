import React, {Component} from 'react';
import { __API__ } from './../../globals'
import AutoComplete from 'material-ui/AutoComplete';
import { get } from 'jquery';


// FROM
// http://www.material-ui.com/#/components/auto-complete

export default class AutoCompleteExampleSimple extends Component {

    constructor(props) {
        super(props);
        this.onUpdateInput = this.onUpdateInput.bind(this);
        this.state = {
            dataSource : [],
            inputValue : ''
        }
    }

    performSearch() {
        const self = this;
        const url  = __API__ + "/autocomplete?q=" + self.state.inputValue;

        if(this.state.inputValue !== '') {
            get(url, (data) => {
                let searchResults;

                searchResults = data.map(e => e.text);

                self.setState({
                    dataSource: searchResults
                });
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
        return <AutoComplete
            hintText="Drug or side effect"
            dataSource={this.state.dataSource}
            filter={AutoComplete.caseInsensitiveFilter}
            onUpdateInput={this.onUpdateInput} />
    };
}