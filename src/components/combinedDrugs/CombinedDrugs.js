import React, {Component} from 'react';
import {get} from 'jquery';
import { __API__, __ADR__, __ADRS__, buildUrl } from './../../globals';
import PossibleAdverseDrugReactionItem from '../drug/PossibleAdverseDrugReactionItem';
import {List} from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress';
import {GridList, GridTile} from 'material-ui/GridList';
import AdverseDrugReactionItem from '../drug/AdverseDrugReactionItem';
import '../../utilities/prototypeExtensions';
import Range from '../../utilities/Range';
import PubSub from 'pubsub-js';


export default class Drug extends Component {

    constructor(props) {
        super(props);

        this.state = {
            drugs: [],
            adrs: [],
            displayed: [],
            adrsLoaded: false,
            items: 10,
            inputValue: '',
            searchAdrs: []
        };

        this.handleScroll = this.handleScroll.bind(this);
        this.searchAdrs = this.searchAdrs.bind(this);
    }

    searchAdrs() {
        const url = buildUrl([__API__, __ADR__ + "?q=" + this.state.inputValue]);
        get(url, (adrs) => {
            this.setState({
                searchAdrs: adrs.filter(e => !this.state.adrs.find(i => i.umls_id === e.umlsid))
            });
        }).fail(() => {
            console.log("Failed to load ADRs");
        });
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

        let handleDrugEvent = () => {
            let drugs = this.props.store.getState().drugs;

            this.setState({
                drugs: drugs
            });

            this.fetchAdrs(drugs);
        };

        this.storeSubscription = this.props.store.subscribe(handleDrugEvent);

        this.props.store.dispatch({
            type: "GET_DRUGS"
        });

        this.subscription = PubSub.subscribe('SEARCH_INPUT_CHANGE', (message, data) => {
            this.setState({
                inputValue: data
            }, () => {
                this.filter();
                this.searchAdrs();
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

        // Will unsubscribe from store sub
        this.storeSubscription();

        PubSub.unsubscribe(this.subscription);
    }

    fetchAdrs(drugs) {
        let queryString = "?q=" + drugs.map(e => e.identifier).join("&q=");

        const url = buildUrl([__API__, __ADRS__ + queryString]);
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

        let suggestions = <div/>;

        if(this.state.searchAdrs.length > 0){
            suggestions = <div>
                <p className="drugsContainer">
                    <strong>
                        This effects match your search and may not be reported by this drug (click + to add them):
                    </strong>
                </p>
                <List className="possibleAndrsContainer">
                    {this.state.searchAdrs.map(e => <PossibleAdverseDrugReactionItem key={e.umlsid} data={e}/>)}
                </List>
            </div>;
        }

        return (<div>
                <GridList cols={3}>
                    {this.state.drugs.map((drug) => (
                        <GridTile
                            key={drug.identifier}
                            title={drug.name}
                            titleBackground={drug.name.getHashCode().intToHSL()}
                            rows={0.3}
                        >
                        </GridTile>
                    ))}
                </GridList>
                {this.loading()}
                <List className="drugsContainer">
                    {filteredAndSorted.map(e => <AdverseDrugReactionItem key={e.umls_id} data={e}/>)}
                </List>
                {suggestions}
            </div>
        )
    };
}