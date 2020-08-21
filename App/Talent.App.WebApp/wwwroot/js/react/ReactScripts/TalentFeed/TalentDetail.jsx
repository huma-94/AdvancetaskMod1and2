import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { Popup, Icon, Button } from 'semantic-ui-react';
import Video from '../TalentFeed/Video.jsx';




export default class TalentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            video: false
        }
    };


    render() {
       
        let video = this.state.video;
        let user = this.props.user;
        //console.log(user);

        let currentEmployment = user.currentEmployment ? user.currentEmployment: "ABC,Developer"
        //user.currentEmployment;

        let num = currentEmployment ? currentEmployment.search(",") : "";
        let employer = currentEmployment ? currentEmployment.slice(0, num) : "";
        let position = currentEmployment ? currentEmployment.slice(num + 1) : "";

        let visaStatus = user.visa ? user.visa : "";

        let server = 'https://standardtaskprofile.azurewebsites.net/profile/profile/updateProfilePhoto';
        let n = server.search("/profile");
        let url = server.slice(0, n);
        let imageId = user.photoId ? url + user.photoId : "http://semantic-ui.com/images/avatar/large/ade.jpg";
        
        
        
        return (
           
                <React.Fragment>
                    <div className="ui segment">
                        <div> <div className="ui two column stackable grid">
                        <div className="column">
                            <img className="ui large image" src={imageId} /></div>
                        <div className="column"><b>Talent snapshot</b><br></br><br></br>
                            CURRENT EMPLOYER <br></br>
                            {employer}<br></br><br></br>
                            VISA STATUS<br></br>
                            {visaStatus}<br></br><br></br>
                            POSITION<br></br>
                            {position}
                        </div>
                        </div></div>
                    </div>
                    <div className="ui segment">
                        <div className="ui four column center aligned stackable grid">
                        <Button icon onClick={this.props.changeMode}>
                            <Icon name='video' />
                        </Button>
                            <div className="column"><i className="file pdf outline icon"></i></div>
                            <div className="column"><i className="linkedin icon"></i></div>
                            <div className="column"><i className="github icon"></i></div>
                        </div>
                    </div>
                </React.Fragment>
               
                

            

        )
    }
}