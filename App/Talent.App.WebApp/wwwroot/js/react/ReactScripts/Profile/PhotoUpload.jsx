import React, { Component, Fragment } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);
        const imageId = props.imageId ?
            Object.assign({}, props.imageId)
            : "";

        this.state = ({
            profilePhoto:props.imageId,
            edited: false,
            file:''
        
        });
        this.handleImageChange = this.handleImageChange.bind(this);
        this.renderPhoto = this.renderPhoto.bind(this);
        this.renderImage = this.renderImage.bind(this);
        this.renderNoImage = this.renderNoImage.bind(this);
        this.renderUploadButton = this.renderUploadButton.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);
        this.updateDisplayedPhoto = this.updateDisplayedPhoto.bind(this);
       // this.postimage=this.postimage.bind(this);
       //this.saveimage=this.saveimage.bind(this);
       this.handleUploadImage=this.handleUploadImage.bind(this);
    };
    


    render() {
        return (
            <div className="ui grid">
                <div className='ui row'>
                    <div className="ui sixteen wide column">
                    {this.renderPhoto()}
                            <input
                            className="input-image"
                            type="file"
                            name="file"
                            id="profilePhoto"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={this.handleImageChange}
                            
                        />
                    </div>
                </div>
                {this.state.edited ? this.renderUploadButton() : null}
            </div>
        );
    }

    handleImageChange(event) {
        if (event.target.files && event.target.files[0]) {
              this.setState({
                profilePhoto: URL.createObjectURL(event.target.files[0]),
                edited: true
            });
        }
    }

    renderPhoto() {
        
        return this.state.profilePhoto ? this.renderImage() : this.renderNoImage();
       //this.renderImage();
    }
    /*saveimage()
    {
        console.log('in save image');
    }*/

    renderImage() {
        return (
             <label htmlFor="profilePhoto" className="ui icon">
              <img src={this.state.profilePhoto} alt="W3Schools.com" className="ui medium circular image" />  
            </label>
             
            
        );
    }

    renderNoImage() {
        return (
            <label htmlFor="profilePhoto" className="ui icon">
                <i className="camera retro circular huge icon"></i>
            </label>
        );
    }

    renderUploadButton() {
        return (
            <div className='ui row'>
                <div className="ui sixteen wide column">
                    <button className="ui upload teal button" onClick={this.updateDisplayedPhoto}>
                        <i aria-hidden="true" className="upload icon"></i>
                        Upload
                    </button>
                </div>
            </div>
        );
    }

   
    updateDisplayedPhoto(event) {
        console.log('image url before');
        event.preventDefault();
        this.uploadPhoto();
        this.setState({
            edited: false
        });
        
    }
    
/*
    postimage(ID){
        console.log('image in postimage',ID);
        
       var cookies = Cookies.get('talentAuthToken');
    $.ajax({
        url:'http://localhost:60290/profile/profile/updateProfilePhoto',
        headers: {
            'Authorization': 'Bearer ' + cookies
        },
        type: "POST",
        data:ID,
       // processData: false,
       // contentType: false,
        success: function (res) {
            console.log('result of Postimage',res)
            if (res.success == true) {
                TalentUtil.notification.show("Profile photo uploaded sucessfully", "success", null, null)
            } else {
                TalentUtil.notification.show("Profile did not upload successfully", "error", null, null)
            }
            

            this.setState({
                edited: false
            });

        }.bind(this),
        error: function (res, a, b) {
            console.log(res)
            console.log(a)
            console.log(b)
        }
    })
}*/


handleUploadImage() {
    //let data = new FormData();
   // data.append('file',this.state.file);
    console.log('In upload image',this.state.file);
    const image = this.state.file;
    this.props.updateProfileData({ ProfilePhotoUrl: image })
    this.props.saveProfileData({ ProfilePhotoUrl: image })
    console.log('image value is',image );
  
   /* $.ajax({
        url: 'http://localhost:60290/profile/profile/updateProfilePhoto',
        headers: {
                
            'Authorization': 'Bearer ' + Cookies.get('talentAuthToken')
        },
        
        type: "POST",
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (res) {
          
            if (res.success) {
                 this.setState(Object.assign({}, this.state, { file: null }));
                this.props.updateProfileData(res.data);
                TalentUtil.notification.show("Update photo successfully", "success", null, null);
                console.log('in If statement');
            } else {
                console.log('somehting went wrong');
                TalentUtil.notification.show(res.message, "error", null, null);
              
            }
        }.bind(this),
        error: function (res, status, error) {
            TalentUtil.notification.show("There is an error when updating Image - " + error, "error", null, null);
        }
    });*/


   
}




   // uploadPhoto(event) {
    uploadPhoto() {
        console.log('in upload photo');
            const r = new XMLHttpRequest()
            const d = new FormData()
            const e = document.getElementsByClassName('input-image')[0].files[0]
            console.log('The value of e is',e);
            var u
        
            d.append('image', e)
        
            
            axios.post('https://api.imgur.com/3/image/',d, {
         headers: {
           Authorization: 'Client-ID 225204ce1824551'
         }
        }).then(result => {
          debugger;
          
              u = `https://i.imgur.com/${result.data.data.id}.png`

              this.setState(Object.assign({}, this.state, { file: null }));
              this.setState({file:u})

              this.props.updateProfileData(u);

              console.log('value of file',this.state.file);

        
             // function call save the result.data.data.id
             console.log('value of u',u);
             this.handleUploadImage();
          
              TalentUtil.notification.show("Profile photo uploaded sucessfully", "success", null, null)
              
        }, error => {
          TalentUtil.notification.show("Profile did not upload successfully", "error", null, null)
        });



                     }

            }
            
    
            
            
    

    

