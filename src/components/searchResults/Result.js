import React, {Component} from 'react';
import {ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom';

export default class Result extends Component {

    constructor(props) {
        super(props);
        this.state = {
            element: props.data
        };
    }

    render() {
        return( <Link
            to={ (this.state.element.type === "adr"? "adr/" : "drug/") + this.state.element.reference}
            className="searchResult">
            <ListItem
                primaryText={this.state.element.name}
                secondaryText={"Search matched by a " + this.state.element.type}
            />
        </Link>)
    };
}