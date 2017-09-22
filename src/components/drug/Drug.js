import React, {Component} from 'react';
import {get} from 'jquery';
import { __API__, __DRUG__, __ADRS__, buildUrl } from './../../globals';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
import AdverseDrugReactionItem from './AdverseDrugReactionItem';
import CircularProgress from 'material-ui/CircularProgress';
import './Drug.css';
import FontIcon from 'material-ui/FontIcon';
import Range from '../../utilities/Range';

const drugIcon = <FontIcon className="material-icons">blur_circular</FontIcon>;
const linkOutIcon = <FontIcon className="material-icons resize-linkout">open_in_new</FontIcon>;

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
            adrs: [],
            adrsLoaded: false
        };
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
        let frequencyAdrs = this.state.adrs
            .filter(e => e.lower !== null && e.higher !== null)
            .map(e => {
                e.range = new Range(e.lower, e.higher);
                return e;
            })
            .sort((e,i) => {
                return e.range.mean() < i.range.mean()
            });

        let noFrequencyAdrs = this.state.adrs.filter(e => e.lower === null || e.higher === null);

        return (<div>
                <Card className="drug">
                    <CardHeader
                        title={this.state.drug.name}
                        subtitle={<a style={{"textDecoration": "underline", "color": "inherit"}} target="_blank" href={"https://drugbank.ca/drugs/" + this.state.drug.drugbankid}>{this.state.drug.drugbankid}{linkOutIcon}</a>}
                        showExpandableButton={true}
                        avatar={drugIcon}
                    />
                    <CardText expandable={true}>
                        Products: {this.state.drug.products !== undefined ? this.state.drug.products.join(', ') : ""}
                        <br />
                        Synonyms: {this.state.drug.synonyms !== undefined ? this.state.drug.synonyms.join(', ') : ""}
                    </CardText>
                </Card>
                {this.loading()}
                <List className="drugsContainer">
                    {frequencyAdrs.map(e => <AdverseDrugReactionItem key={e.umls_id} data={e}/>)}
                    {noFrequencyAdrs.map(e => <AdverseDrugReactionItem key={e.umls_id} data={e}/>)}
                </List>

            </div>
        )
    };
}