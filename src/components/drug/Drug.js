import React, {Component} from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import {get} from 'jquery';
import { __API__, __DRUG__, buildUrl } from './../../globals';
import {Card, CardHeader, CardText} from 'material-ui/Card'


export default class Result extends Component {

    constructor({match}) {
        super();

        const url = buildUrl([__API__, __DRUG__, match.params.drugbankId]);
        get(url, (drug) => {
            this.setState({
                drug: drug
            });
        }).fail(() => {
            // Most likely the drug didn't exist, so send back home!
            this.props.history.push('/');

        });

        this.state = {
            drug: {}
        };
    }

    // TODO - ADRs with linearprogress where value is avg(range)*100
    // <LinearProgress mode="determinate" value={50} />
    render() {
        return (<div>
                <Card>
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
            </div>
        )
    };
}