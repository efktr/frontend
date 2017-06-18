import React, {Component} from 'react';
import {ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';

const warningIcon = <FontIcon className="material-icons">warning</FontIcon>;
const drugIcon = <FontIcon className="material-icons">blur_circular</FontIcon>;


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
                leftIcon={(this.state.element.type === "adr"? warningIcon : drugIcon)}
                primaryText={this.state.element.name}
                secondaryText={"Search matched by a " + this.state.element.type}
            />
        </Link>)
    };
}