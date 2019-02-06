/* eslint-disable */
import React, {Component} from 'react';
import ApiReqService from "../../../services/ApiReqService";
import AjaxExecutor from "../../../services/AjaxExecutor";

export default class ManagementConsole extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: '',
            lessons: []
        };
    }

    /**
     *
     * @param lessons {Array}
     * @param type {LessonType}
     * @return {Array.<T>}
     */
    getLessonsFromType(lessons, type) {
        lessons = lessons.filter(lesson => lesson.type === type);
        return lessons.sort((a, b) => {
            return new Date(b.dateAdded) - new Date(a.dateAdded);
        });
    }

    componentDidMount() {
        console.log(`${ApiReqService.baseUrl()}/lessons/getAll`);
        AjaxExecutor.callServerGet(`${ApiReqService.baseUrl()}/lessons/getAll`, undefined, this.handleSuccess, this.handleFailure);
    }

    handleSuccess = (res) => {
        // res = res.json();
        this.setState({
            lessons: res
            , isLoaded: true
        })
    };

    handleFailure = (err) => {
        this.setState({
            err: err
            , isLoaded: true
        })
    };

    render() {
        const {lessons, isLoaded} = this.state;

        return <form ref='uploadForm'
                     id='uploadForm'
                     action='/upload'
                     method='post'
                     encType="multipart/form-data">
            <input type="file" name="lesson"/>
            <input type="textarea" name="fileName"/>
            <input type='submit' value='Upload!'/>
        </form>
    }
}

