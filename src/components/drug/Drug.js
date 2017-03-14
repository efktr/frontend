import React, {Component} from 'react';
import LinearProgress from 'material-ui/LinearProgress';

export default class Result extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
                This ADR
                <LinearProgress mode="determinate" value={50} />
            </div>
        )
    };
}