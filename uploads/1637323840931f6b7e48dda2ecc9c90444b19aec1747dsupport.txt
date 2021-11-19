import React, { useState, useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import UserContext from '../context/UserContext';
import Router from 'next/router';
import Navbar2 from '../components/Navbar2';
import Topbar from '../components/topbar';
import Footer2 from '../components/Footer2';
import Head from 'next/head';
import axios from 'axios';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker
} from "react-google-maps";
import { ToastProvider, useToasts } from 'react-toast-notifications';

const defaultCenter = { lat: 40.748817, lng: -73.985428 };

const defaultOptions = { scrollwheel: false };

const RegularMap = withScriptjs(
	withGoogleMap(props => (
		<GoogleMap
			defaultZoom={8}
			defaultCenter={ defaultCenter }
			defaultOptions={ defaultOptions }
			>
			<Marker position={ defaultCenter } />
		</GoogleMap>
	))
);

const loadingElementStyle = { height: '100%' };
const containerElementStyle = { height: '600px' };
const mapElementStyle = { height: '100%' };

const Support = (props) => {
	const { state, isUserAuth } = useContext(UserContext);
	const [isLogin, setIsLogin] = useState('');

	const {addToast} = useToasts();
	const [submitInfo, setSubmitInfo] = useState({
		firstName: '',
		LastName: '',
		email: '',
		phoneNumber: '',
		subject: '',
		message: '',
		emailErrorText: ''
	})

	useEffect(() => {
		if(document.getElementsByClassName('nav-list support').length > 0){
			for(let i=0; i<document.getElementsByClassName('nav-list support').length; i++) {
				document.getElementsByClassName('nav-list support')[i].classList.add("active");
			}
		}
	}, []);

	const validateEmail = (e) =>
	{
		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(e);
 	};

	const _handleEmailChange = (e) =>
	{
		e.preventDefault();
		e.persist();
		let errorText = ''
		if (!validateEmail(e.target.value)) {
			errorText = 'Email Format Error'
		}
		setSubmitInfo((prev) => ({
			...prev,
			emailErrorText: errorText,
			email: e.target.value,
		}))
	}

	const _handleFirstNameChange = (e) =>
	{
		e.preventDefault();
		e.persist();
		console.log(e);
		setSubmitInfo((prev) => ({
			...prev,
			firstName: e.target.value,
		}))
	}

	const _handleLastNameChange = (e) =>
	{
		e.preventDefault();
		e.persist();
		setSubmitInfo((prev) => ({
			...prev,
			lastName: e.target.value,
		}))
	}

	const _handlePhoneNumberChange = (e) =>
	{
		e.preventDefault();
		e.persist();
		setSubmitInfo((prev) => ({
			...prev,
			phoneNumber: e.target.value,
		}))
	}

	const _handleSubjectChange = (e) =>
	{
		e.preventDefault();
		e.persist();
		setSubmitInfo((prev) => ({
			...prev,
			subject: e.target.value,
		}))
	}

	const _handleMessageChange = (e) =>
	{
		e.preventDefault();
		e.persist();
		setSubmitInfo((prev) => ({
			...prev,
			message: e.target.value,
		}))
	}

	const _onSubmit = async (e) =>
	{
		e.preventDefault();
		e.persist();
		if (submitInfo.emailErrorText == '') {
			await axios
			.post('http://localhost:5000/support/feedback', {
				data: submitInfo,
			})
			.then((response) => {
				console.log(response);
				if(response.data == 'success'){
					addToast('send feedback success', {appearance: 'success'});
				} else {
					addToast('send feedback error', {appearance: 'success'});
				}
			});
		} else {
			console.log("has error, unable to submit")
		}
	}

	return (
		<Layout>
			<div className='appear-animate'>
				<Navbar2 />
				<Topbar />
				<div className="container">
					<div className="banner row">
						<div className="col-md-6">
							<h1>SUBMIT TICKET</h1>
							<p>we will reply to all messages within 1 business day.</p>
							<form onSubmit={(e) => _onSubmit(e)}>
								<div className="row">
									<div className="col-md-6">
										<input type="text" placeholder="FirstName" className="form-control" value={submitInfo.firstName} onChange={(e) => _handleFirstNameChange(e)} />
										<input type="text" placeholder="Email" className="form-control" value={submitInfo.Email} onChange={(e) => _handleEmailChange(e)} />
									</div>
									<div className="col-md-6">
										<input type="text" placeholder="LastName" className="form-control" value={submitInfo.lastName} onChange={(e) => _handleLastNameChange(e)} />
										<input type="text" placeholder="PhoneNumber" className="form-control" value={submitInfo.phoneNumber} onChange={(e) => _handlePhoneNumberChange(e)} />
									</div>
								</div>
								<div className="row">
									<div className="col-md-12">
										<input type="text" placeholder="subject" className="form-control" value={submitInfo.subject} onChange={(e) => _handleSubjectChange(e)} />
									</div>
									<div className="col-md-12">
										<textarea row="30" c0l="30" type="text" placeholder="Message" className="form-control" value={submitInfo.message} onChange={(e) => _handleMessageChange(e)}></textarea>
									</div>
								</div>
								<div className="submit">
									<button type="submit">SUBMIT</button>
								</div>
							</form>
						</div>
						<div className="col-md-6 contactus">
							<div>
								<h1>CONTACT US</h1>
								<p>We are here to help!</p>
								<div className="row">
									<div className="col-md-2">
										<i className="fa fa-map"></i>
									</div>
									<div className="col-md-10">
										<p>
											3130-580 Seaborne Avenue<br></br>
											Port Coquitlam, B.C.<br></br>
											V3B OM3<br></br>
											CANADA
										</p>
									</div>
								</div>
								<div className="row">
									<div className="col-md-2">
										<i className="fa fa-envelope"></i>
									</div>
									<div className="col-md-10">
										<p>
											Email: <a>support@shipbymail.com</a><br></br>
											Web: <a>https://shipbymail.com</a>
										</p>
									</div>
								</div>
								<div className="row">
									<div className="col-md-2">
										<i className="fa fa-clock-o"></i>
									</div>
									<div className="col-md-10">
										<p>
											Mon-Fri: 9AM - 5PM PST
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="google-map">
					<RegularMap
						googleMapURL="https://maps.googleapis.com/maps/api/js?key="
						loadingElement={<div style={ loadingElementStyle } />}
						containerElement={<div style={ containerElementStyle } />}
						mapElement={<div style={ mapElementStyle } />}
					/>
				</div>
				<Footer2 />
				<style jsx>{`
					div,
					section {
						background: white;
					}
					.banner {
						padding-top: 60px;
						padding-bottom: 10px;
					}
					.form-control{
						font-size: 14px;
					}
					.banner h1 {
						color: #1e487c;
						font-size: 26px;
						margin-bottom: 10px;
					}
					.banner input {
						margin-bottom: 20px;
						border-radius: 4px;
					}
					.banner textarea {
						height: 200px;
					}
					.banner .submit {
						text-align: center;
					}
					.banner button[type="submit"] {
						padding: 12px 30px;
						border: none;
						border-radius: 6px;
						background-color: #1e487c;
						color: white;
						margin: 15px 0px;
					}
					.banner .contactus {
						display: flex;
						justify-content: center;
					}
					.banner p {
						font-size: 18px;
						color: black;
					}
					.contactus p{
						font-size: 16px;
					}
					.contactus i {
						font-size: 24px;
						color: #1e487c;
					}
					.contactus a {
						color: #1e487c;
					}
					.google-map {
						margin-bottom: 50px;
					}
				`}</style>
			</div>
		</Layout>
	);
};

const App = props => (
	<ToastProvider>
	  <Support />
	</ToastProvider>
);


export default App;
