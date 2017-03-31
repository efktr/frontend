import React, {Component} from 'react';
import {ListItem} from 'material-ui/List';
import LinearProgress from 'material-ui/LinearProgress';
import Range from '../../utilities/Range';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';

export default class AdverseDrugReactionItem extends Component {

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
                <Toolbar className="adr-toolbar">
                    <ToolbarGroup firstChild={true}>
                        {(this.state.range.mean()*100).toFixed(1) + "% " + this.state.name}
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <IconButton {...this.props}
                            touch={true}
                            tooltip="I had this side effect"
                            tooltipPosition="top-left"
                            iconStyle={{width: 30, height: 30}}
                            onTouchTap={this.positiveFeedback}>
                            <ThumbUp />
                        </IconButton>
                        <IconButton {...this.props}
                            touch={true}
                            tooltip="I don't recall this side effect"
                            tooltipPosition="top-left"
                            iconStyle={{width: 30, height: 30}}
                            onTouchTap={this.negativeFeedback}>
                            <ThumbDown />
                        </IconButton>
                    </ToolbarGroup>
                </Toolbar>
                <LinearProgress
                    mode="determinate"
                    value={this.state.range.mean() + this.state.top + this.state.bottom}
                    max={1}
                    min={0}
                    color="#c0646e"
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