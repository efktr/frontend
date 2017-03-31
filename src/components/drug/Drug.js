import React, {Component} from 'react';
import {get} from 'jquery';
import { __API__, __DRUG__, __ADRS__, buildUrl } from './../../globals';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
import AdverseDrugReactionItem from './AdverseDrugReactionItem';
import './Drug.css';

export default class Drug extends Component {

    constructor({match}) {
        super();

        const url = buildUrl([__API__, __DRUG__, match.params.drugbankId]);
        get(url, (drug) => {
            this.setState({
                drug: drug
            });

            this.fetchAdrs();
        }).fail(() => {
            // Most likely the drug didn't exist, so send back home!
            this.props.history.push('/');
        });

        this.state = {
            drug: {},
            drugbankId: match.params.drugbankId,
            adr: []
        };
    }

    fetchAdrs() {
        const url = buildUrl([__API__, __ADRS__, this.state.drugbankId]);
        get(url, (adrs) => {
            this.setState({
                adr: adrs
            });
        }).fail(() => {
            console.log("Failed to load ADRs");
        });
    }

    render() {
        return (<div>
                <Card className="drug">
                    <CardHeader
                        title={this.state.drug.name}
                        subtitle={this.state.drug.drugbankid}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        Products: {this.state.drug.products !== undefined ? this.state.drug.products.join(', ') : ""}
                        <br />
                        Synonyms: {this.state.drug.synonyms !== undefined ? this.state.drug.synonyms.join(', ') : ""}
                        <br />
                        More: <a target="_blank" href={"https://drugbank.ca/drugs/" + this.state.drug.drugbankid}>Drugbank</a>
                    </CardText>
                </Card>
                <List>
                    {this.state.adr.map(e => <AdverseDrugReactionItem key={e.name} data={e}/>)}
                </List>
            </div>
        )
    };
}