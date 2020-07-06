import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { Popup, Icon } from 'semantic-ui-react';
import TalentCard from '../TalentFeed/TalentCard.jsx';
import TalentDetail from '../TalentFeed/TalentDetail.jsx';



export default class TalentCardDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    };


    render() {
       
        let users = this.props.feedData;
        let res = undefined;
        if (users && users.length > 0) {
            res = users.map(x =>
                <TalentCardReady
                    key={x.id}
                    user={x}
                    />
                );
        }
        return (
            res != undefined ?
                res : <div className="ui segments"></div>

        )
    }
}

export class TalentCardReady extends React.Component {
    constructor(props) {
        super(props);
        
    };
    

    render() {
       
        let user = this.props.user;
       
        if (user.skills == null) user.skills = ["C#", ".Net"];
        
        let skills = user.skills ? user.skills.map(x => <button key={x} className="ui teal basic button">{x}</button>): "";
          
        return (
            <div className="ui segments">
                <div className="ui segment">
                    {user.name}
                </div>
                <TalentCard user={user} />
                <div className="ui segment">
                    {skills} 
                </div>

            </div>

        )
    }
}