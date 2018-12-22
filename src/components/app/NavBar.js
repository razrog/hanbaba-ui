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

                <Navbar className="main-navbar navbar navbar-inverse">
                    <Navbar.Header>
                        <Navbar.Brand className="active">
                            <a onClick={(event) => {this.onClick('/home', event)}} href="/home">ראשי</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1} onClick={(event) => {this.onClick('/halacha', event)}} href="/halacha">הלכות </NavItem>
                        <NavItem eventKey={2} onClick={(event) => {this.onClick('/gmara', event)}} href="/gmara">גמרא </NavItem>
                        <NavItem eventKey={3} onClick={(event) => {this.onClick('/musar', event)}} href="/musar">מוסר </NavItem>
                        <NavItem eventKey={4} onClick={(event) => {this.onClick('/avot', event)}} href="/avot">פרקי אבות </NavItem>
                        <NavItem eventKey={5} onClick={(event) => {this.onClick('/parasha', event)}} href="/parasha">פרשת השבוע </NavItem>
                        <NavItem eventKey={6} onClick={(event) => {this.onClick('/moed', event)}} href="/moed">מועדים </NavItem>
                    </Nav>
                </Navbar>
        )
    }


}