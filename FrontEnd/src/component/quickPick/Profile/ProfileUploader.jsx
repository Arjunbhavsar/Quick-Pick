import React, { Component } from "react";
import FileService from "../../../api/FileService";
import UserService from '../../../api/UserService';
import AuthenticationService from './../AuthenticationService';
import blank_profile from './../blank-profile.png';
import './ProfileUploader.css';

// import PDFViewer from 'pdf-viewer-reactjs'

export default class ProfileUploader extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			urlTag: 'http://localhost:9090/load/',
			selectedFiles: undefined,
			currentFile: undefined,
			progress: 0,
			message: "",
			isLoading: true,
			userObj: null,
			profile: null,
			profileCond: false,
			uploaded: false
		};

		this.selectFile = this.selectFile.bind(this);
		this.uploadProfile = this.uploadProfile.bind(this);
	}

	async componentDidMount() {
		const data = await	UserService
							.executeGetUserService(sessionStorage
							.getItem('authenticatedUser'))
							.then(result => result.data);
							console.log('loading data ...');
		this.setState({userObj : data, isLoading : false});
		var evt = document.createEvent('Event');
        evt.initEvent('load', false, false);
        window.dispatchEvent(evt);
	}

	selectFile(event) {
		console.log(event.target);
		this.setState({
			selectedFiles: event.target.files,
			progress: 0
		});
	}

	async uploadProfile() {
		console.log("WOOO");
		let currentFile = this.state.selectedFiles[0];
		this.setState({ progress: 0, currentFile: currentFile});

		FileService.uploadProfile(currentFile, (event) => {
			this.setState({
				progress: Math.round((100 * event.loaded) / event.total),
			});
		})
		.then((response) => {
			this.setState({
				profile: response.data,
				profileCond: true
			});
			window.location.reload();
			console.log(response)
			// this.props.updater()
		})
		.catch(() => {
			this.setState({
				progress: 0,
				message: "Could not upload the file!",
				currentFile: undefined,
			});
		});

		const data = await	UserService
							.executeGetUserService(sessionStorage
							.getItem('authenticatedUser'))
							.then(result => result.data);
		this.setState({userObj: data});

		this.setState({
			selectedFiles: undefined,
		});
		this.setState({uploaded: false});
	}

	render() {
		const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
		const style = {
			Paper : {padding:20, marginTop:10, marginBottom:10},
			image : {'borderRadius':'50%', width:"200px", height:"200px", "object-fit":"cover"}
		}
		// Upload once selected file exists
		if(this.state.selectedFiles !== undefined && !this.state.uploaded) {
			this.uploadProfile();
			this.setState({uploaded: true});
		}
		if(this.state.isLoading)
			return (<div>Loading...</div>);
		if(!isUserLoggedIn)
			return <></>
		return (
			<label for="image" class="hovereffect">
				<input type="file" name="image" id="image" onChange={this.selectFile} style={{"display":"none"}}/>
				{this.state.userObj.profileFileId != null ?
					(<img class="image" src={this.state.urlTag + this.state.userObj.profileFileId} alt={this.state.userObj.username + "-profile-image"} style={style.image}/>) :
					(<img class="image" src={blank_profile} alt="profile-blank" style={style.image}/>)
				}
				<div style={style.image} class="overlay">+</div>
			</label>
		);
	}
}