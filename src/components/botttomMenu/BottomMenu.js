import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import Badge from 'material-ui/Badge';
import './BottomMenu.css'
import { push } from 'react-router-redux'


export default class BottomMenu extends Component {

    constructor(props){
        super(props);

        this.state = {
            drugs: [],
            adrs: []
        };

        this.goToPage = this.goToPage.bind(this);
    }

    componentDidMount() {
        let handleDrugEvent = () => {
            let drugs = this.props.store.getState().drugs;

            this.setState({
                drugs: drugs
            });
        };

        this.storeSubscription = this.props.store.subscribe(handleDrugEvent);
    }

    componentWillUnmount() {

        // Will unsubscribe from store sub
        this.storeSubscription();
    }

    goToPage(){
        let link = '/drugs';
        this.props.store.dispatch(push(link));
    }

    render() {
        const warningIcon = <div>
            <FontIcon className="material-icons">warning</FontIcon>
            <Badge
                badgeContent={this.state.adrs.length}
                primary={true}
                style={{position:"absolute"}}
            />
        </div>;
        const drugIcon = <div>
            <FontIcon className="material-icons">blur_circular</FontIcon>
            <Badge
                badgeContent={this.state.drugs.length}
                primary={true}
                style={{position:"absolute"}}

            />
        </div>;

        return (<div>
                <Paper className="BottomMenu">
                    <BottomNavigation>
                        {/*<BottomNavigationItem*/}
                            {/*label="ADRs"*/}
                            {/*icon={warningIcon}*/}
                            {/*onTouchTap={() => {}}*/}
                        {/*/>*/}
                        <BottomNavigationItem
                            label="Drugs"
                            icon={drugIcon}
                            onTouchTap={this.goToPage}
                        />
                    </BottomNavigation>
                </Paper>
            </div>
        )
    };
}
