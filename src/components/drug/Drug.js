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
import PubSub from 'pubsub-js';

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
            displayed: [],
            adrsLoaded: false,
            items: 10,
            inputValue: ''
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= (docHeight - 10)) {
            this.setState({
                items: (this.state.items + 10 > this.state.displayed.length ? this.state.displayed.length : this.state.items + 10)
            });
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);

        this.subscription = PubSub.subscribe('SEARCH_INPUT_CHANGE', (message, data) => {
            this.setState({
                inputValue: data
            }, () => {
                this.filter();
            });
        });
    }

    filter() {
        this.setState({
            displayed: this.state.adrs.filter((element) => {return element.name.match(new RegExp(this.state.inputValue, "i"))})
        })
    }


    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);

        PubSub.unsubscribe(this.subscription);
    }

    fetchAdrs() {
        const url = buildUrl([__API__, __ADRS__, this.state.drugbankId]);
        get(url, (adrs) => {
            this.setState({
                adrs: adrs,
                displayed: adrs,
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
        let filteredAndSorted = this.state.displayed
            .map(e => {
                if(e => e.lower !== null && e.higher !== null){
                    e.range = new Range(e.lower, e.higher);
                }
                return e;
            })
            .sort((e,i) => {
                //return (e.lower === null || e.higher === null) && (i.lower !== null && i.higher !== null)
                //return e.range !== undefined && i.range === undefined
                return i.lower > e.lower && i.higher > e.higher
            })
            .slice(0, this.state.items);

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
                    {filteredAndSorted.map(e => <AdverseDrugReactionItem key={e.umls_id} data={e}/>)}
                </List>

            </div>
        )
    };
}