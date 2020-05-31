import React, { Component } from 'react'
import './App.css'
import './style.css'
import './nav-bar.css'
import Body from './Components/Body'
import TabList from './Components/TabList'
import ScrollToTop from './Components/ScrollToTop'
import SimpleReactLightbox from 'simple-react-lightbox'
import HamburgerMenu from './Components/HamburgerMenu'


export class App extends Component {

	constructor() {
		super();
		this.state = {
			activeTab: 6,
		}
		this.changeTab = (id) => {
			this.setState({
				activeTab: id
			})
		}
	} 

  	render() {
	  	const tabs = [
	  	{
	  		id:1,
	  		title: 'Home'
	  	},
	  	{
	  		id:2,
	  		title: 'Projects'
	  	},
	  	{
	  		id:3,
	  		title: 'Photography'
	  	},
	  	{
	  		id:4,
	  		title: 'Recipes'
	  	},
	  	{
	  		id:5,
	  		title: 'Guest Book'
		}, 
		{
			id:6,
			title: 'Movies'
		}
	  	]
	    return (
	    	<div className="body">
	    		<SimpleReactLightbox>
	    		<div className="navigation-bar">
	    			<div className="logo">Renee Labutay</div>
	    			<TabList className="nav-links" tabs={tabs} 
	    			changeTab={this.changeTab}
	    			activeTab={this.state.activeTab}/>
	    			<div className="burger-menu">
	    				<HamburgerMenu/>
	    			</div>
	    		</div>
	    		
	    		<div className="main-body-content">
	    			<Body activeTab={this.state.activeTab}/>
	    		</div>

	    		<div className="scroll-button">
	    			<ScrollToTop/>
	    		</div>
	    		</SimpleReactLightbox>
	    	</div>
	    );
  }
}
export default App;