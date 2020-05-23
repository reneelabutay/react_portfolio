import React, { Component } from "react";

export class ScrollToTop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
	}

	componentDidMount() {
		var scrollComponent = this;
		document.addEventListener("scroll", function(e) {
			scrollComponent.ToggleVisibility();
		});
	}

	ToggleVisibility() {
		if(window.pageYOffset > 200) {
			this.setState({
				visible: true
			});
		} else {
			this.setState({
				visible: false
			})
		}
	}

	ScrollToTop() {
		window.scrollTo({
			top:0,
			behavior:"smooth"
		});
	}

	render() {
		const {visible} = this.state;
	    return (
	    	<div>
	    	{visible && (
	    		<a href="#" onClick={this.ScrollToTop} className="go-to-top">
					Back to Top 	    		
		    	</a>

	    	)}
	    	</div>
	    	
	    );
	}
}
export default ScrollToTop;

