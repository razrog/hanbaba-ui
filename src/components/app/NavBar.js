/*eslint-disable*/

import {Nav, NavItem,Navbar} from 'react-bootstrap';
import history from './history.js';

import React, {Component} from 'react';

export default class NavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
        };
    }

    onClick(href, event){
        event.preventDefault();
        history.push(href);
    }

    render() {
        return (

            <Navbar className="pd-navbar">
                <Navbar.Header>
                    <Navbar.Brand>
                        <a onClick={(event) => {this.onClick('/ui', event)}} href="/ui">Product-Development</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} onClick={(event) => {this.onClick('/ui', event)}} href="/ui">
                        Home
                    </NavItem>
                    <NavItem eventKey={2} onClick={(event) => {this.onClick('/ui/kpis', event)}} href="/ui/kpis">
                        KPIs
                    </NavItem>
                    <NavItem eventKey={2} onClick={(event) => {this.onClick('/ui/releasereadiness', event)}} href="/ui/releasereadiness">
                        Version Readiness
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }


}