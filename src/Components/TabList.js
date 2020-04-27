import React, { Component } from 'react';
import Tab from './Tab'


export class TabList extends Component {
  render() {
  	return (
  		<div className = "nav-links">
  			{this.props.tabs.map((indTab) => {
  				return (
	    		<Tab tab={indTab} 
	    		changeTab={this.props.changeTab}
	    		activeTab={this.props.activeTab}/>
    		)})}

  		</div>

  	);
    
  }
}
export default TabList;

/*
- looping over the values that were from tabs array
- for each tab component every tab is the value of tab
- 
*/
