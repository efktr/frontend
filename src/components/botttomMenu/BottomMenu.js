import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import './BottomMenu.css'

const warningIcon = <FontIcon className="material-icons">warning</FontIcon>;
const drugIcon = <FontIcon className="material-icons">blur_circular</FontIcon>;

export default class BottomMenu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
                <Paper className="BottomMenu">
                    <BottomNavigation>
                        <BottomNavigationItem
                            label="ADRs"
                            icon={warningIcon}
                            onTouchTap={() => {}}
                        />
                        <BottomNavigationItem
                            label="Drugs"
                            icon={drugIcon}
                            onTouchTap={() => {}}
                        />
                    </BottomNavigation>
                </Paper>
            </div>
        )
    };
}
