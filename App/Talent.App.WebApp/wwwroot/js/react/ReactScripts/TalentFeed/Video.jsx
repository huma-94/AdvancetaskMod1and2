import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { Popup, Icon, Button } from 'semantic-ui-react';




export default class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            video: false
        }
    };
    
    setVideo() {

    }

    render() {
        let user = this.props.user;
        let url = user.videoUrl ? user.videoUrl : 'https://www.youtube.com/watch?v=ll7JyRxWMQY'
        return (
            <React.Fragment>
                <div className="ui segment">
                    <ReactPlayer url={url} height='229px' width='100%' />
                
                </div>
                <div className="ui segment">
                    <div className="ui four column center aligned stackable grid">
                        <div className="column">
                            <Button icon onClick={this.props.changeMode}>
                            <Icon name='user' />
                            </Button>
                        </div>
                        <div className="column"><i className="file pdf outline icon"></i></div>
                        <div className="column"><i className="linkedin icon"></i></div>
                        <div className="column"><i className="github icon"></i></div>
                    </div>
                </div>
            </React.Fragment>

           

        )
    }
}