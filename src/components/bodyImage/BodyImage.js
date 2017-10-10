import React, {Component} from 'react';
import EfktrBody from 'efktr-body';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PubSub from 'pubsub-js';

export default class BodyImage extends Component {

    state = {
        open: false,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.subscription = PubSub.subscribe('SHOW_BODY', () => {
            this.setState({
                open: true
            });
        });
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.subscription);
    }

    handleClose = () => {
        this.setState({open: false});
    };

    render(){

        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />
        ];

        return (
            <Dialog
                title="Body"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}
            >
                <EfktrBody  />
            </Dialog>
        )
    }

}