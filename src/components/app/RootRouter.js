/* eslint-disable */
import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import history from './history.js';
import Home from "./Home";
import KpisHome from "./Kpis/Portal/KpisHome";
import KpiManagment from "./Kpis/Management/KpiManagment";
import {RedinessHome} from "./VersionReadiness/RedinessHome";

export class RootRouter extends React.Component {

    constructor(props) {
        super( props );
    }

    getCurrLocation() {
        return `/ui/${history.location.search}`;
    }

    render() {

        return (
            <master-frame style={{display: 'block', height: '100%'}} id='pd-portal-server'>
                <Router history={history}>
                    <div style={{height: '100%'}}>

                        <Switch>

                            <Route exact path={'/:base*/ui/'}
                                   render={(props) => (<Home/>)}/>

                            <Route exact path={'/:base*/ui/kpis'}
                                   render={(props) => (<KpisHome/>)}/>

                            <Route exact path={'/:base*/ui/kpis/management'}
                                   render={(props) => (<KpiManagment/>)}/>

                            <Route exact path={'/:base*/ui/releasereadiness'}
                                   render={(props) => (<RedinessHome/>)}/>

                            <Redirect from="/**" to={this.getCurrLocation()}/>

                        </Switch>
                    </div>

                </Router>
            </master-frame>
        );
    }
}
