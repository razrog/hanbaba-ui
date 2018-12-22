import React, {Component} from 'react'
import {Card, Icon, Image} from 'semantic-ui-react'
import Sound from 'react-sound';

export default class LessonCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            description: this.props.description,
            rabbi: this.props.rabbi,
            dateAdded: this.props.dateAdded,
            pathToFile: this.props.pathToFile
        }
    }

    render() {
        const {name, description, rabbi, dateAdded, pathToFile} = this.state;

        return (
            <div className="cards">
                <Card className="ui container center aligned">
                    <Card.Content>
                        <Card.Header>{description}</Card.Header>
                        <Card.Meta>{dateAdded}</Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <div className="audioBar">
                            <audio
                                controls
                                controlsList="nodownload"
                                src={pathToFile}>
                                Your browser does not support the
                                <code>audio</code> element.
                            </audio>
                        </div>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}