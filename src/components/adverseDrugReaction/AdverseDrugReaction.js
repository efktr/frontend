import React, {Component} from 'react';
import {get} from 'jquery';
import { __API__, __DRUGS__, __ADR__, buildUrl } from './../../globals';
import {Card, CardHeader} from 'material-ui/Card';
import {List} from 'material-ui/List';
import Drug from './DrugItem';
import './AdverseDrugReaction.css';

export default class AdverseDrugReaction extends Component {

    constructor({match}) {
        super();

        const url = buildUrl([__API__, __ADR__, match.params.umlsId]);
        get(url, (adr) => {
            this.setState({
                adr: adr
            });

            this.fetchDrugs();
        }).fail(() => {
            console.log("Loading ADR info failed! This should not have happened.")
        });

        this.state = {
            adr: {},
            umlsId: match.params.umlsId,
            adrs: []
        };
    }

    fetchDrugs() {
        const url = buildUrl([__API__, __DRUGS__, this.state.umlsId]);
        get(url, (adrs) => {
            this.setState({
                adrs: adrs
            });
        }).fail(() => {
            console.log("Failed to load ADRs");
        });
    }

    render() {
        return (<div>
                <Card className="adr">
                    <CardHeader
                        title={this.state.adr.name}
                        subtitle={this.state.umlsId}
                    />
                </Card>
                <List>
                    {this.state.adrs.map(e => <Drug key={e.name} data={e}/>)}
                </List>
            </div>
        )
    };
}