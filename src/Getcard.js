/* eslint-disable */
import React, { Component } from "react";
import Card from "react-md/lib/Cards/Card";
import CardTitle from "react-md/lib/Cards/CardTitle";
import CardActions from "react-md/lib/Cards/CardActions";
import CardText from "react-md/lib/Cards/CardText";
import Media from "react-md/lib/Media";
import './App.css';
/* eslint-enable */

const metaimg = "/img/meta2.png";
const mistimg = "/img/mist2.png";

class Getcard extends Component {


	constructor(props){
		super(props);
		this.state = {
			web3present: this.props.web3present,
			coinbasepresent: this.props.coinbasepresent, 
			wrongnet: this.props.wrongnet
		};


	}

	openmeta(){
		window.open("https://metamask.io/");
	}

	openmist(){
		window.open("https://github.com/ethereum/mist/releases");
	}
	render() {
		return (
			<Card className="infocard">
				<CardTitle className="centertitle" title="Needs more Ethereum"/>
				<CardText>
					{!this.state.web3present && <p>In order to use this application you need to have <strong>Metamask</strong> installed in your Chrome browser, or download the Ethereum <strong>Mist browser</strong>.</p>}
					{!this.state.coinbasepresent && <p>You need to have an ethereum account, and if using Metamask have it open</p>}
					{this.state.wrongnet && <p>You need to be on mainnet</p>}
				</CardText>
				<div className="md-grid ">
					<Media className="md-cell md-cell--6">
						<img src={metaimg} alt="presentation" onClick={()=>{this.openmeta();}} title="Metamask Plugin for Chrome Browser"/>
					</Media>

					<Media className="md-cell md-cell--6">
						<img src={mistimg} alt="presentation" onClick={()=>{this.openmist();}} title="Mist Browser"/>
					</Media>
				</div>

			</Card>
		);
	}
}

export default Getcard;
