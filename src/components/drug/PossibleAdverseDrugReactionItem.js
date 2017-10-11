import React, {Component} from 'react';
import {ListItem} from 'material-ui/List';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import FontIcon from 'material-ui/FontIcon';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';

export default class PossibleAdverseDrugReactionItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.data.name,
            umls: props.data.umlsid,
            open: false
        };

        this.positiveFeedback = this.positiveFeedback.bind(this);
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
            open: true
        });
    }

    render() {
        let title = this.state.name;

        return(
            <ListItem disabled={true}>
                <Toolbar className="adr-toolbar">
                    <ToolbarGroup firstChild={true}>
                        {title}
                    </ToolbarGroup>
                    <ToolbarGroup style={{zIndex:0}}>
                        <IconButton {...this.props}
                                    touch={true}
                                    tooltip={<div className="priority">I had this side effect</div>}
                                    tooltipPosition="top-left"
                                    iconStyle={{width: 30, height: 30}}
                                    onTouchTap={this.positiveFeedback}

                        >
                            <FontIcon className="material-icons">add</FontIcon>
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