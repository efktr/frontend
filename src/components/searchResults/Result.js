import React, {Component} from 'react';
import {ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { push } from 'react-router-redux'

export default class Result extends Component {

    constructor(props) {
        super(props);
        this.state = {
            element: props.data,
            inStore: false
        };

        this.addToStore = this.addToStore.bind(this);
        this.removeFromStore = this.removeFromStore.bind(this);
        this.goToPage = this.goToPage.bind(this);
    }

    componentDidMount() {
        let self = this;

        let handleDrugEvent = () => {
            let drugs = this.props.store.getState().drugs;

            let duplicate = drugs.findIndex(
                function(drug){
                    return drug.equals({
                        identifier: self.state.element.reference
                    })
                });

            this.setState({
                inStore: duplicate !== -1
            });
        };

        this.storeSubscription = self.props.store.subscribe(handleDrugEvent);
    }

    componentWillUnmount() {
        // Will unsubscribe from store sub
        this.storeSubscription();
    }

    addToStore(){
        this.props.store.dispatch({
            type: "ADD_DRUG",
            payload: {
                identifier: this.state.element.reference,
                name: this.state.element.name
            }
        });
    }

    removeFromStore(){
        this.props.store.dispatch({
            type: "REMOVE_DRUG",
            payload: {
                identifier: this.state.element.reference
            }
        });
    }

    goToPage(){
        let link =  '/' + (this.state.element.type === "adr" ? "adr/" : "drug/") + this.state.element.reference;
        this.props.store.dispatch(push(link));
    }

    render() {
        const drugIcon = <FontIcon
            onTouchTap={this.goToPage}
            className="material-icons">
            blur_circular
        </FontIcon>;

        const warningIcon = <FontIcon
            onTouchTap={this.goToPage}
            className="material-icons">
            warning
        </FontIcon>;

        const addIcon = <FontIcon className="material-icons">add</FontIcon>;
        const removeIcon = <FontIcon className="material-icons">remove</FontIcon>;

        return(
            <ListItem
                leftIcon={(this.state.element.type === "adr" ? warningIcon : drugIcon)}
                primaryText={
                    <div onClick={this.goToPage} >
                        {this.state.element.name}
                    </div>}
                secondaryText={
                    <div onClick={this.goToPage} >
                        {this.state.element.type.toString().capitalize()}
                    </div>
                }

                rightToggle={
                    <div>
                        {
                            this.state.inStore ?
                                <IconButton onTouchTap={this.removeFromStore} >
                                    {removeIcon}
                                </IconButton> :
                                <IconButton onTouchTap={this.addToStore} >
                                    {addIcon}
                                </IconButton>
                        }
                    </div>
                }
            />
        )
    };
}