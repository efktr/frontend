import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import Badge from 'material-ui/Badge';
import './BottomMenu.css'

const warningIcon = <div>
    <FontIcon className="material-icons">warning</FontIcon>
    <Badge
        badgeContent={10}
        primary={true}
        style={{position:"absolute"}}
    />
</div>;
const drugIcon = <div>
    <FontIcon className="material-icons">blur_circular</FontIcon>
    <Badge
        badgeContent={10}
        primary={true}
        style={{position:"absolute"}}

    />
</div>;

export default class BottomMenu extends Component {

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
