import React, { useState, useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import UserContext from '../context/UserContext';
import Navbar2 from '../components/Navbar2';
import Topbar from '../components/topbar';
import Footer2 from '../components/Footer2';
import Head from 'next/head';
import axios from 'axios';

const pricing = props => {
	const { state, isUserAuth } = useContext(UserContext);

	const [isLogin, setIsLogin] = useState('');

	const [submitInfo, setSubmitInfo] = useState({
		shipToCountryId: 0,
		height: 0,
		length: 0,
		width: 0,
		dimensionUnit: 'CM',
		weightUnit: 'KG',
		shipTo: '',
		shipToPostal: '',
		shipToCity: '',
		weight: 0,
		productTotal: 0
	});

	const [pricedata, setPriceData] = useState({
		error: '',
		label: '',
		ec_charge: ''
	})

	useEffect(() => {
		if(document.getElementsByClassName('nav-list pricing').length > 0){
			for(let i=0; i<document.getElementsByClassName('nav-list pricing').length; i++) {
				document.getElementsByClassName('nav-list pricing')[i].classList.add("active");
			}
		}
	}, []);

	const _handleChangeShipToCountry = (e) =>
	{
		e.preventDefault();
		e.persist();
		setSubmitInfo((prev) => ({
			...prev,
			shipToCountryId: e.target.value,
		}))
	}

	const _handleChangePostalCode = (e) =>
	{
		e.preventDefault();
		e.persist();
		setSubmitInfo((prev) => ({
			...prev,
			shipToPostal: e.target.value,
		}))
	}

	const _handleChangeWeight = (e) =>
	{
		e.preventDefault();
		e.persist();
		setSubmitInfo((prev) => ({
			...prev,
			weight: Number(e.target.value),
		}))
	}

	const _handleChangeWeightUnit = (e) =>
	{
		e.preventDefault();
		e.persist();
		setSubmitInfo((prev) => ({
			...prev,
			weightUnit: e.target.value,
		}))
	}

	const _handleChangeHeight = (e) =>
	{
		e.preventDefault();
		e.persist();
		setSubmitInfo((prev) => ({
			...prev,
			height: Number(e.target.value),
		}))
	}

	const _handleChangeLength = (e) =>
	{
		e.preventDefault();
		e.persist();
		setSubmitInfo((prev) => ({
			...prev,
			length: Number(e.target.value),
		}))
	}

	const _handleChangeWidth = (e) =>
	{
		e.preventDefault();
		e.persist();
		setSubmitInfo((prev) => ({
			...prev,
			width: Number(e.target.value),
		}))
	}

	const _handleChangeDimensionUnit= (e) =>
	{
		e.preventDefault();
		e.persist();
		setSubmitInfo((prev) => ({
			...prev,
			dimensionUnit: e.target.value,
		}))
	}

	const _handleChangeProductTotal = (e) =>
	{
		e.preventDefault();
		e.persist();
		setSubmitInfo((prev) => ({
			...prev,
			productTotal: Number(e.target.value),
		}))
	}

	const _onSubmit = async (e) =>
	{
		e.preventDefault();
		e.persist();
		await 
		axios
		.post('http://localhost:5000/pricing/getprice', {data: submitInfo})
		.then((response) => {
			console.log(response);
			if(response.data.error == 0){
				setPriceData((prev) => ({
					...prev,
					label: response.data.shippingServices.ups_worldwide_expedited.label,
					ec_charge: response.data.shippingServices.ups_worldwide_expedited.ec_charge
				}));
			} else {
				setPriceData((prev) => ({
					...prev,
					error: response.data.error
				}))
			}
		});
	}

	return (
		<>
			<Layout>
				<div className='appear-animate'>
					<Navbar2 />
					<Topbar />
					<div className="banner">
						<div className="banner-title">
							<h1>ShipMymail Shipping Cost Calculator</h1>
						</div>
						<div>
							<form onSubmit={(e) => _onSubmit(e)}>
								<p>1. where do you want to send a package?</p>
								<div className="row">
									<div className="col-md-6">
										<select placeholder="Country" className="form-control" value={submitInfo.shipToCountryId} onChange={(e) => _handleChangeShipToCountry(e)}>
											<option value="0">Country</option>
											<option value="1">Canada</option>
											<option value="2">UnitedStates</option>
											<option value="3">UnitedKingdom</option>
										</select>
									</div>
									<div className="col-md-6">
										<input className="form-control" value={submitInfo.shipToPostal} onChange={(e) => _handleChangePostalCode(e)} placeholder="Postal Code" />
									</div>
								</div>
								<p>2. Shipping Weight & Dimensions & Value</p>
								<div className="row">
									<div className="col-md-5">
										<h3>Weight</h3>
										<div className="row">
											<div className="col-md-6">
												<input className="form-control" value={submitInfo.weight} onChange={(e) => _handleChangeWeight(e)} placeholder="0" />
											</div>
											<div className="col-md-6">
												<select placeholder="Country" className="form-control" value={submitInfo.weightUnit} onChange={(e) => _handleChangeWeightUnit(e)}>
													<option value="IBS">Ibs</option>
													<option value="KG">Kg</option>
												</select>
											</div>
										</div>
									</div>
									<h3>Shipping Box Dimensions</h3>
									<div className="col-md-7">
										<div className="row">
											<div className="col-md-3">
												<input type="number" className="form-control" value={submitInfo.height} onChange={(e) => _handleChangeHeight(e)} placeholder="0" />
											</div>
											<div className="col-md-3">
												<input type="number" className="form-control" value={submitInfo.length} onChange={(e) => _handleChangeLength(e)} placeholder="0" />
											</div>
											<div className="col-md-3">
												<input type="number" className="form-control" value={submitInfo.width} onChange={(e) => _handleChangeWidth(e)} placeholder="0" />
											</div>
											<div className="col-md-3">
												<select placeholder="Country" className="form-control" value={submitInfo.dimensionUnit} onChange={(e) => _handleChangeDimensionUnit(e)}>
													<option>Inch</option>
												</select>
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-md-2">
										<h3>Value(CAD$)</h3>
										<input type="number" value={submitInfo.productTotal} className="form-control" onChange={(e) => _handleChangeProductTotal(e)} />
									</div>
									<div className="col-md-10"></div>
								</div>
								<div style={{textAlign:"center"}}>
									<button type="submit">Calculate</button>
								</div>
							</form>
						</div>
						<div className="shpping-info">
							<div className="shipping-info-title">
								<h1>Your Shipping Options</h1>
							</div>
							<div className="shipping-info-content">
								<div className="pricedata">
									{
										pricedata.error != '' ?
										<div>{pricedata.error}</div> :
										<div className="row">
											<div className="col-md-8">{pricedata.label}</div>
											<div className="col-md-4">CAD $ {pricedata.ec_charge}</div>
										</div>
									}
								</div>
								<p>
									&nbsp;&nbsp;&nbsp;Disclaimer: Local currencies displayed are approximate. Final cost will be determined by 
									your credit card &nbsp;&nbsp;&nbsp;issuer or Paypal. Exchange rates flutuate on a daily basis.
								</p>
								<p>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;price INCLUDES Tax, Fuel Surcharge and Customs Processing Fees
								</p>
							</div>
						</div>
						<div>
							<table>
								<thead>
									<th>Free Services (Included in your Shipping Rate)</th>
								</thead>
								<tbody>
									<tr><td>Discounted Express Shipping</td></tr>
									<tr><td>Receiving and matching your package to your home address</td></tr>
									<tr><td>30 Days Storage</td></tr>
									<tr><td>Repacking for international Shipping</td></tr>
									<tr><td>CustomsDeclaration</td></tr>
								</tbody>
							</table>
							<table>
								<thead>
									<th>Premium Service</th>
									<th>Service Charge</th>
								</thead>
								<tbody>
									<tr>
										<td>Multi Package Consolidation</td>
										<td>CAD $4.99 per Package</td>
									</tr>
									<tr>
										<td>Order 3 photos of your purchase</td>
										<td>CAD $2.99</td>
									</tr>
									<tr>
										<td>Contents Check</td>
										<td>CAD $4.99</td>
									</tr>
									<tr>
										<td>Electronics Check</td>
										<td>CAD $9.99</td>
									</tr>
									<tr>
										<td>Additional Packaging</td>
										<td>CAD $9.99</td>
									</tr>
									<tr>
										<td>Insurance (Optional)</td>
										<td>CAD $2.99 per CAD $100 of product value</td>
									</tr>
									<tr>
										<td>BuyForMe Service (Assisted Purchase</td>
										<td>C15% of Purchase Value or CAD $8.7 (whichever is greater)</td>
									</tr>
									<tr>
										<td>Product Return</td>
										<td>CAD $34.99 + Application Local Postage</td>
									</tr>
									<tr>
										<td>Storage Fees</td>
										<td>CAD $1 per day per KG after 30 days</td>
									</tr>
								</tbody>
							</table>
							<p style={{marginBottom: "30px", marginTop: "20px"}}>
								*Quote excludes specialty items such as food items, liquids, perfumes, certain lithium battery shipments, 
								and dangerous goods shipments. If you are uncertain about the products you are shipping, please contact one 
								of our Shipping Experts here.
							</p>
						</div>
					</div>
					<Footer2 />
					<style jsx>{`
						div,
						section {
							background: white;
						}
						table {
							width: 100%;
						}
						table th {
							background-color: #1e487c;
							padding: 3px 20px;
							color: white;
							font-weight: normal;
						}
						table td {
							border: 1px solid #cbc4c4;
							padding: 3px 20px;
						}
						.banner {
							padding: 60px 25%;
						}
						.banner-title h1 {
							font-size: 26px;
							color: #1e487c;
							margin-top: 10px;
							margin-bottom: 10px;
						}
						.pricedata {
							font-size: 24px;
							margin-bottom: 10px;
						}
						.pricedata .row .col-md-8 {
							text-align: center;
						}
						.shipping-info-title h1{
							font-size: 26px;
							text-align: center;
							margin-top: 10px;
							margin-bottom: 10px;
						}
						.shipping-info-content .pricedata .col-md-4 {
							text-align: center;
							font-size: 24px;
						}
						.banner form h3 {
							font-size: 20px;
							margin: 5px 0px;
						}
						.form-control{
							font-size: 14px;
							border-radius: 4px;
							border: 1px solid black;
							margin-bottom: 15px;
						}
						.banner form p{
							margin-bottom: 8px;
						}
						.banner form button{
							width: 95%;
							padding: 9px 0px;
							background-color: #1e487c;
							border: none;
							border-radius: 4px;
							color: white;
							text-align: center;
							margin-top: 20px;
						}
					`}</style>
				</div>
			</Layout>
		</>
	);
};

export default pricing;
