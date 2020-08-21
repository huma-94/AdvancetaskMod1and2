import React from 'react';
import { Loader, Button } from 'semantic-ui-react';
import Cookies from 'js-cookie';


export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
        

        this.state = {
            companyProfile: null
        }
        this.loadData = this.loadData.bind(this);
        this.updateWithoutSaving = this.updateWithoutSaving.bind(this);

    }

    componentDidMount() {
        this.loadData();
    };

    updateWithoutSaving(newValues) {
        let values = Object.assign({}, this.state.companyProfile, newValues);
        this.setState({
            companyProfile: values
        })
    }; 

    loadData() {
        let cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://standardtaskprofile.azurewebsites.net/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
               
              //  console.log(res);
                this.updateWithoutSaving(res.employer.companyContact);
              
               
            }.bind(this)
        })
    }

    render() {
        let displayText = "We currently do not have specific skills that we are looking for";

        let companyProfile = this.state.companyProfile ? this.state.companyProfile :
            {
                name: "",
                email: "",
                phone: null,
                firstName: null,
                lastName: null,
                location: {
                    country: null,
                    city: null
                }
            };
            let imageId = "https://react.semantic-ui.com/images/wireframe/square-image.png";
           
            return (
                <div className="ui card">
                    <div className="content">
                        <div className="center aligned header">
                            <Button htmlFor="file" as="label" className="ui tiny circular image" ><img src={imageId} />   
                            </Button>
                        </div>
                        <div className="center aligned header">
                            {companyProfile.name}
                        </div>
                        <div className="center aligned location">
                            <i className=" map marker alternate icon"></i> {companyProfile.location.city}, {companyProfile.location.country}
                        </div><br></br>
                        <div className="center aligned summary">
                            {displayText}
                        </div>   
                    </div>
                    <div className="extra content">
                        <div className="summary"><i className="phone icon"></i> : {companyProfile.phone} </div>
                        <div className="summary"><i className="envelope icon"></i> : {companyProfile.email} </div>
                    </div>
            </div>
            )
    
     }
}