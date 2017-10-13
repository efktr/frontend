import React, {Component} from 'react';
import {get} from 'jquery';
import { __PREDADR_, __SMILES__, buildUrl } from './../../globals';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import PubSub from 'pubsub-js';
import CircularProgress from 'material-ui/CircularProgress';

export default class Predict extends Component {
    state = {
        adrs: [],
        input: '',
        open: false
    };

    constructor(props) {
        super(props);

        this.state = {
            adrs: [],
            input: '',
            open: false,
            loading: false,
            error: ''
        };

        this.getADRs = this.getADRs.bind(this);
        this.updateText = this.updateText.bind(this);
    }

    componentDidMount() {
        this.subscription = PubSub.subscribe('SHOW_PREDADR', () => {
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

    updateText(_, newValue){
        this.setState({
            input: newValue
        })
    }

    loading() {
        if (this.state.loading) {
            return (<div style={{
                textAlign: "center",
                margin: "2em"
            }}>
                <CircularProgress />
            </div>)
        }
    }

    getADRs() {
        this.setState({
            loading: true
        });

        const url = buildUrl([__PREDADR_, __SMILES__, this.state.input]);

        get(url, (adrs) => {
            this.setState({
                adrs: adrs,
                loading: false,
                error: ''
            });
        }).fail(() => {
            this.setState({
                adrs: [],
                loading: false,
                error:'There was an error retrieving the ADRs for this SMILES string. Are you sure it\'s correct?'
            });
            console.log("Failed to load ADRs");
        });
    };


    render() {

        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />
        ];

        return(
            <Dialog
                title="Predict"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}
                contentStyle={{
                    width: '90%',
                    maxWidth: 'none',
                    height: '100%',
                    maxHeight: 'none',
                }}
            >
                <div style={{
                    textAlign: "center"
                }}>
                    <strong>Write SMILES string: </strong>
                    <TextField name="smilesString" onChange={this.updateText} />
                    <FlatButton
                        primary={true}
                        label="Submit"
                        onClick={this.getADRs}
                    />
                </div>

                {this.loading()}
                <List style={{
                    maxWidth: "20em",
                    margin: "0 auto"
                }}>
                    {this.state.adrs.map(e => <ListItem key={e} primaryText={e}/>)}
                </List>
                {this.state.error}
            </Dialog>
        )

    };
}