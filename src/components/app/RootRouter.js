/* eslint-disable */
import React from 'react';
import {Redirect, Router, Route, Switch} from 'react-router-dom';
import history from './history.js';
import Home from "./Home";
import Lessons from "./Lessons/Lessons";


function LessonType(type) {
    this.type = type;
}

const LESSON_TYPE = {
    GMARA: new LessonType('GMARA'),
    HALACHOT: new LessonType('HALACHOT'),
    AVOT: new LessonType('AVOT'),
    PARASHA: new LessonType('PARASHA'),
    MOED: new LessonType('MOED'),
    MUSAR: new LessonType('MUSAR'),
    VIDEO: new LessonType('VIDEO'),
};

export class RootRouter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: props.lessons,
        }
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

                            <Route exact path="/"
                                   render={(props) => (<Home/>)}/>

                            <Route path={'/:base*/parasha/'}
                                   render={(props) => (
                                       <Lessons key="parash" type={LESSON_TYPE.PARASHA.type}
                                                header="פרשת השבוע"/>)}/>

                            <Route path={'/:base*/gmara/'}
                                   render={(props) => (
                                       <Lessons key="gmara" type={LESSON_TYPE.GMARA.type}
                                                header="גמרא"/>)}/>

                            <Route path={'/:base*/musar/'}
                                   render={(props) => (
                                       <Lessons key="musar" type={LESSON_TYPE.MUSAR.type}
                                                header="מוסר - חובת הלבבות"/>)}/>

                            <Route path={'/:base*/avot/'}
                                   render={(props) => (
                                       <Lessons key="avot" type={LESSON_TYPE.AVOT.type}
                                                header="פרקי אבות"/>)}/>

                            <Route path={'/:base*/moed/'}
                                   render={(props) => (
                                       <Lessons key="moed" type={LESSON_TYPE.MOED.type}
                                                header="מועדים"/>)}/>

                            <Route path={'/:base*/halacha/'}
                                   render={(props) => (
                                       <Lessons key="halacha" type={LESSON_TYPE.HALACHOT.type}
                                                header="הלכות שבת קודש"/>)}/>

                            <Route path={'/:base*/vod/'}
                                   render={(props) => (
                                       <Lessons key="vod" type={LESSON_TYPE.VOD.type}
                                                header="שיעורים מצולמים"/>)}/>
                        </Switch>
                    </div>

                </Router>
            </master-frame>
        );
    }
}
