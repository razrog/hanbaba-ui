/* eslint-disable */
import React, {Component} from 'react';
import ApiReqService from "../../../services/ApiReqService";
import AjaxExecutor from "../../../services/AjaxExecutor";
import LessonCard from "../LessonCard";

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

        const lessonsList = lessons.map((lesson) => {
            return <LessonCard key={lesson.id}
                               name={lesson.name}
                               description={lesson.description}
                               rabbi={lesson.rabbi}
                               dateAdded={lesson.dateAdded}
                               pathToFile={lesson.pathToFile}
            />
        });

        if (!isLoaded) {
            return <h4>שיעורים נטענים...</h4>
        }
        else {
            return <div>
                <div className="container" style={{textAlign: 'center'}}>
                    <h1>{this.state.header}</h1>
                    <h4>כל השיעורים</h4>
                    <h5> סה״כ שיעורים זמינים ({this.state.lessons.length})</h5>
                    {lessonsList}
                </div>
            </div>


        }
    }
}

