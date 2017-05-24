/* eslint-disable */
import React, {Component} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router,Route, Switch} from "react-router-dom";
import {Card,CardTitle,CardText} from "react-md/lib/Cards";
import NavigationDrawer from "react-md/lib/NavigationDrawers";
import Randvatar from "./Randvatar.js";
import Greeting from "./bar.js"; // FIXME remove this before release
import Web3 from "web3"; // web3
import NavLink from "./Navlink"; // Utility class
import Getcard from "./Getcard.js"; // here down are our own imports
import Showcard from "./Showcard.js";
import Regcard from "./Regcard.js";
import ThanksFooter from "./ThanksFooter.js";
import {GetCoinbase, CheckGetweb3, CheckTransaction, ParseOutNameAddr } from "./DappUtils.js";

/* esling-enable */


const NETWORK = {
	MAINNET:"1",
	ROPSTEN:"3",
	RINKEBY:"4"
};

const navItems = [{
	exact: true,
	label: "Lookup",
	to: "/",
	icon: "home",
}, {
	label: "Register",
	to: "/register",
	icon: "bookmark",
 }//, {
// 	label: "Page 2",
// 	to: "/page-2",
// 	icon: "donut_large",
// }, {
// 	label: "Page 3",
// 	to: "/page-3",
// 	icon: "flight_land",
// }
];


class App extends Component {
	render() {
		return (
			<Route
			render={({ location }) => (
				<NavigationDrawer
					drawerTitle="Nav"
					toolbarTitle="Register.eth"
					navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
					drawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
					footer={ThanksFooter()}
				>

					<Web3wrapper passon={location}/>

				</NavigationDrawer>
			)}
			/>
		);
	}
}


class Web3wrapper extends Component {
	constructor(props){
		super(props);
		this.state = {
			web3:null,
			coinbase:null
		}
	}
	componentWillMount(){
		this.redoEth(this);
	}

	redoEth(caller){
		let web3 = CheckGetweb3();
		let coinbase = GetCoinbase(web3);
		if(!web3||!coinbase){
			setTimeout(function(){caller.redoEth(caller);},100);
		}
		caller.setState({web3: web3, coinbase:coinbase});
	}
	render(){
		let web3 = this.state.web3;
		let coinbase = this.state.coinbase;
		let passonlocation = this.props.passon;
		console.log("show me the probel",web3, coinbase, passonlocation, web3.version.network);
		if(!web3 || !coinbase || web3.version.network!==NETWORK.RINKEBY ){ // no web3 so we show them the getcard FIXME this needs to be set to 1 for mainnet
			return (
				<Getcard web3present={!!web3} coinbasepresent={!!coinbase} wrongnet={web3.version.network!==NETWORK.RINKEBY}/> //web3 = {!web3} loggedIn ={!coinbase}
			)
		} else{
			return (
					<Switch>
						<Route exact path="/" location={passonlocation} render={(rprops) => <Showcard {...rprops} web3={web3} coinbase={coinbase}/>}  />
						<Route path="/register" location={passonlocation} render={(rprops) => <Regcard {...rprops} web3={web3} coinbase={coinbase}/>} />
						<Route path="/testget" location={passonlocation} render={(rprops) => <Getcard {...rprops} />} />
						<Route path="/" location={passonlocation} component={Woops} />
					</Switch>
				)
		}
	};
}

class Woops extends Component {
	render() {
		return (
			<Card className="infocard">
				<CardTitle title="How'd you get here?!"/>
				<CardText>
					<p>You seem to be lost, try heading back to the main page <a href="/"> home </a> </p>
				</CardText>


			</Card>
		);
	}
}
ReactDOM.render(<Router><App /></Router>, document.getElementById("root"));

export default App;
