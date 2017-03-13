import React, {Component} from 'react';
import { __API__ } from './../../globals'
import AutoComplete from 'material-ui/AutoComplete';
import { ajax } from 'jquery';

// FROM
// http://www.material-ui.com/#/components/auto-complete

export default class AutoCompleteExampleSimple extends Component {
    state = {
        dataSource: [],
    };

    handleUpdateInput = (value) => {
        let self = this;
        console.log(value);
        ajax({
            url: __API__ + "/autocomplete?q=" + value,
            success: (response) => {
                response = response.map((e) => {
                    return e.text
                });
                console.log([value].concat(response));
                self.setState({
                    dataSource: [value].concat(response),
                });
            }
        });
    };

    render() {
        return (
            <div>
                <AutoComplete
                    hintText="Drug or side effect"
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput}
                />
            </div>
        );
    }
}