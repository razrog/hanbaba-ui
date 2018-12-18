/* eslint-disable */
import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import history from './history.js';
import Home from "./Home";

export class RootRouter extends React.Component {

    constructor(props) {
        super(props);
    }

    getCurrLocation() {
        return `/ui/${history.location.search}`;
    }

    render() {

        return (
            <master-frame style={{display: 'block', height: '100%'}} id='hanbaba-portal'>
                <Router history={history}>
                    <div style={{height: '100%'}}>

                        <Switch>

                            <Route exact path={'/:base*/ui/'}
                                   render={(props) => (<Home/>)}/>

                            <Route exact path={'/:base*/ui/halacha'}
                                   render={(props) => (<h1>halacha</h1>)}/>

                            <Route exact path={'/:base*/ui/parasha'}
                                   render={(props) => (<h1>parasha</h1>)}/>

                            <Redirect from="/**" to={this.getCurrLocation()}/>

                        </Switch>
                    </div>

                </Router>
            </master-frame>
        );
    }
}
