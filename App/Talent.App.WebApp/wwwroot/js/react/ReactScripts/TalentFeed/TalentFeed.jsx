import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import TalentCardDetail from '../TalentFeed/TalentCardDetail.jsx';
import { Loader } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 3,
            loadPosition: 35,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: null
        }

        this.init = this.init.bind(this);
        this.loadData = this.loadData.bind(this);
        this.updateWithoutSave = this.updateWithoutSave.bind(this);
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });
        this.loadData()
    }

    componentDidMount() {
        this.init()
    };

    updateWithoutSave(newData) {
       // console.log(newData);
        this.setState({
            feedData:newData
        })
    }

    loadData() {
        let url = 'https://standardtaskprofile.azurewebsites.net/profile/profile/getTalent'; 
        let cookies = Cookies.get('talentAuthToken');

        $.ajax({
            url: url,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: 'GET',
            data: {
                Position: this.state.loadPosition,
                Number: this.state.loadNumber
            },
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                this.updateWithoutSave(res.data);
            }.bind(this)
        })
    }


    render() {

        return (
            
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container">
                    <div className="ui grid">
                        <div className="four wide column">
                            <CompanyProfile />
                        </div>
                        <div className="eight wide column">
                            <TalentCardDetail feedData={this.state.feedData} />
                        </div>
                        <div className="four wide column">
                            <FollowingSuggestion />
                        </div>
                    </div>
                    <br></br><br></br>
                </div>
            </BodyWrapper>
        )
    }
}