/* eslint-disable */
import React, {Component} from 'react';
import "isomorphic-fetch"
import ApiReqService from "../../services/ApiReqService";
import LessonCard from "./LessonCard";


export default class Lessons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            loadAll: false,
            error: '',
            lessons: [],
            header: props.header,
            type: props.type
        };
        this.handleLoadAll = this.handleLoadAll.bind(this);
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
        fetch(`${ApiReqService.baseUrl()}/lessons/getAll`)
            .then((res) => {
                return res.json();
            })
            .then(res => this.setState({
                lessons: this.getLessonsFromType(res, this.state.type)
                , isLoaded: true
            }));
    }

    handleLoadAll = () => {
        this.setState({loadAll: true});
    };

    render() {
        const {loadAll, lessons, isLoaded} = this.state;

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
            if (loadAll) {
                return <div>
                    <div className="container" style={{textAlign: 'center'}}>
                        <h1>{this.state.header}</h1>
                        <h4>כל השיעורים</h4>
                        <h5> סה״כ שיעורים זמינים ({this.state.lessons.length})</h5>
                        {lessonsList}
                    </div>
                </div>
            }
            else {
                return (
                    <div>
                        <div className="container" style={{textAlign: 'center'}}>
                            <h1>{this.state.header}</h1>
                            <h4>מציג 3 שיעורים אחרונים</h4>
                            <h5> סה״כ שיעורים זמינים ({this.state.lessons.length})</h5>
                            <button onClick={this.handleLoadAll}>טען הכל</button>
                            <br/><br/>
                            {lessonsList.slice(0, 3)}
                        </div>
                    </div>
                )
            }

        }
    }
}

