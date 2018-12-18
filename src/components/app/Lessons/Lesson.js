/* eslint-disable */
import React, {Component} from 'react';
import ApiReqService from "../../services/ApiReqService";
import AjaxExecutor from "../../services/AjaxExecutor";
import "isomorphic-fetch"


export default class Lesson extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: []
        }
    }


    componentDidMount() {
        console.log(`${ApiReqService.baseUrl()}/lessons/getAll`);
        fetch(`${ApiReqService.baseUrl()}/lessons/getAll`)
            .then((res) => res.json())
            .then(res => this.setState({lessons: res}));
    }

    render() {
        const lessons = this.state;
        console.log(lessons);
        return (
            <div>
                <div stysle={{textAlign: 'center'}}>

                </div>
            </div>
        )

    }
}

