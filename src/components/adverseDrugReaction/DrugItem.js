import React, {Component} from 'react';
import {ListItem} from 'material-ui/List';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import Snackbar from 'material-ui/Snackbar';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import IconButton from 'material-ui/IconButton';


export default class DrugItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.data.name,
            open: false,
            top: 0,
            bottom: 0
        };

        this.positiveFeedback = this.positiveFeedback.bind(this);
        this.negativeFeedback = this.negativeFeedback.bind(this);
    }

    handleRequestClose = () => {
        this.setState({
            open: false
        });
    };

    negativeFeedback(event){
        this.setState({
            open: true
        });
    }

    positiveFeedback(event){
        this.setState({
            open: true
        });
    }

    render() {
        return(
            <ListItem disabled={true}>
                <Toolbar className="toolbar">
                    <ToolbarGroup firstChild={true} >
                        {this.state.name}
                    </ToolbarGroup>
                    <ToolbarGroup style={{zIndex:0}}>
                        <IconButton {...this.props}
                                    touch={true}
                                    tooltip="This drug gave me this side effect"
                                    tooltipPosition="top-left"
                                    iconStyle={{width: 30, height: 30}}
                                    onTouchTap={this.positiveFeedback}

                        >
                            <ThumbUp />
                        </IconButton>
                        <IconButton {...this.props}
                                    touch={true}
                                    tooltip="I don't recall this drug giving me this side effect"
                                    tooltipPosition="top-left"
                                    iconStyle={{width: 30, height: 30}}
                                    onTouchTap={this.negativeFeedback}>
                            <ThumbDown />
                        </IconButton>
                    </ToolbarGroup>
                </Toolbar>
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