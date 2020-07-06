import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { Popup, Icon } from 'semantic-ui-react';
import Video from '../TalentFeed/Video.jsx';
import TalentDetail from '../TalentFeed/TalentDetail.jsx';



export default class TalentCard extends React.Component {
    constructor(props) {
       
        super(props);
        this.state = {
            video: false
        };
        this.changeMode = this.changeMode.bind(this); 
    };

    changeMode() {
        if (this.state.video) {
            this.setState({
                video: false
            })
        }
        else {
            this.setState({
                video: true
            })
        }
    }

    render() {
       
        let video = this.state.video;
        let user = this.props.user;
        return (
            video ? <Video changeMode={this.changeMode} user={user} /> : <TalentDetail changeMode={this.changeMode} user={user} />

        )
    }
}