import React, {Component} from 'react';
import {get} from 'jquery';
import { __API__, __DRUG__, __ADRS__, buildUrl } from './../../globals';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import {GridList, GridTile} from 'material-ui/GridList';
import AdverseDrugReactionItem from '../drug/AdverseDrugReactionItem';

export default class Drug extends Component {

    constructor(props) {

        super(props);

        // Implement GET ADRs for combination of drugs

        // this.fetchAdrs();


        this.state = {
            drugs: [],
            adrs: [],
            adrsLoaded: false
        };
    }

    componentDidMount() {
        let handleDrugEvent = () => {
            let drugs = this.props.store.getState().drugs;

            console.log(drugs);

            this.setState({
                drugs: drugs
            });
        };

        this.storeSubscription = this.props.store.subscribe(handleDrugEvent);

        this.props.store.dispatch({
            type: "GET_DRUGS"
        });
    }

    componentWillUnmount() {
        // Will unsubscribe from store sub
        this.storeSubscription();
    }

    fetchAdrs() {
        const url = buildUrl([__API__, __ADRS__, this.state.drugbankId]);
        get(url, (adrs) => {
            this.setState({
                adrs: adrs,
                adrsLoaded: true
            });
        }).fail(() => {
            console.log("Failed to load ADRs");
        });
    }

    loading() {
        if (!this.state.adrsLoaded) {
            return (<div style={{
                textAlign: "center",
                margin: "2em"
            }}>
                <CircularProgress />
            </div>)
        }

    }

    render() {
        return (<div>
                <GridList cols={1.1}>
                    {this.state.drugs.map((drug) => (
                        <GridTile
                            key={drug.identifier}
                            title={drug.name}
                            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                        >
                        </GridTile>
                    ))}
                </GridList>
                {this.loading()}
                <List>
                    {this.state.adrs.map(e => <AdverseDrugReactionItem key={e.name} data={e}/>)}
                </List>

            </div>
        )
    };
}