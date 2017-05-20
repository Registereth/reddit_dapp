/* eslint-disable */
import React, { Component } from "react";
import Card from "react-md/lib/Cards/Card";
import CardTitle from "react-md/lib/Cards/CardTitle";
import CardActions from "react-md/lib/Cards/CardActions";
import CardText from "react-md/lib/Cards/CardText";
import Media from "react-md/lib/Media";
import './Getcard.css';
/* eslint-enable */

const metaimg = "/img/meta2.png";
const mistimg = "/img/mist2.png";

class Getcard extends Component {

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
					<p>In order to use this application you need to have <strong>Metamask</strong> installed in your Chrome browser, or download the Ethereum <strong>Mist browser</strong>.
					You also need to have an ethereum address; and be on mainnet</p>
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
