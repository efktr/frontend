import React, {Component} from 'react';
import {ListItem} from 'material-ui/List';
import LinearProgress from 'material-ui/LinearProgress';
import Range from '../../utilities/Range';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import Snackbar from 'material-ui/Snackbar';

export default class DrugItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.data.name,
            range: new Range(props.data.range),
            open: false,
            top: 0,
            bottom: 0
        };

        this.positiveFeedback = this.positiveFeedback.bind(this);
        this.negativeFeedback = this.negativeFeedback.bind(this);
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
            top: 0,
            bottom: 0
        });
    };

    positiveFeedback(event){
        this.setState({
            open: true,
            top: .05
        });
    }

    negativeFeedback(event){
        this.setState({
            open: true,
            top: -.05
        });
    }

    render() {
        return(
            <ListItem disabled={true}>
                <Toolbar className="toolbar">
                    <ToolbarGroup firstChild={true} >
                        {(this.state.range.mean()*100).toFixed(1) + "% " + this.state.name}
                    </ToolbarGroup>
                </Toolbar>
                <LinearProgress
                    mode="determinate"
                    value={this.state.range.mean() + this.state.top + this.state.bottom}
                    max={1}
                    min={0}
                    color="#c0b06d"
                    style={{
                        height: "1em"
                    }}

                />
                <Snackbar
                    open={this.state.open}
                    message="Thank you for your feedback!"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </ListItem>
        )

    };
}