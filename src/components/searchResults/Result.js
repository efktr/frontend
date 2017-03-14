import React, {Component} from 'react';
import {ListItem} from 'material-ui/List';

export default class Result extends Component {

    constructor(props) {
        super(props);
        this.element = props.data;
    }

    render() {
        return <ListItem
            primaryText={this.element.name}
            secondaryText={"Matched from " + this.element.type}
        />
    };
}