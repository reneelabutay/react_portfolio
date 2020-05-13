import React, { Component } from 'react';
import { SRLWrapper } from "simple-react-lightbox"; // Import SRLWrapper

export class Photography extends Component {
	
  	render() {
	    return (
	    	<div> 
	    		<div className="page-body">
				<h2 className="page-title">Photography</h2>
				<div className="photography-body">
					<div className="photo-description">
						<p>
						I am an amateur photographer and avid user of Adobe Creative Cloud. 
						I enjoy taking nature shots, especially on tropical islands. 
						Here are some pictures I took when I visited the Philippines.
						</p>
					</div>
					<SRLWrapper>
					<div className="photo-row">
						<div className="column">
							<img src={require("./images/islands.jpg")} className="img" alt="islands"/>
							<img src={require("./images/photography/22.jpg")} className="img" alt="hut"/>
							<img src={require("./images/photography/33.jpg")} className="img" alt="water"/>
							<img src={require("./images/photography/44.jpg")} className="img"alt="town"/>
						
	    				</div>
						
						<div className="column">
							<img src={require("./images/photography/55.jpg")} className="img" alt="boat"/>
							<img src={require("./images/photography/66.jpg")} className="img" alt="fruit"/>
							<img src={require("./images/photography/77.jpg")} className="img" alt="food"/>
							<img src={require("./images/photography/88.jpg")} className="img" alt="huts"/>
							
						</div>
						<div className="column">
						
							<img src={require("./images/photography/99.jpg")} className="img" alt="kayak"/>
							<img src={require("./images/photography/100.jpg")} className="img" alt="town"/>
							<img src={require("./images/photography/111.jpg")} className="img"alt="beach"/>
							<img src={require("./images/photography/122.jpg")} className="img"alt="blue water"/>
							
						</div>
						<div className="column">
							
							<img src={require("./images/photography/133.jpg")} className="img"/>
							<img src={require("./images/photography/144.jpg")} className="img"/>
							<img src={require("./images/photography/155.jpg")} className="img"/>
							<img src={require("./images/photography/166.jpg")} className="img"/>
							
						</div>	
					</div>
					</SRLWrapper>
	    		</div>
	    		</div>
	    	</div>
	    );
  	}
}
export default Photography;