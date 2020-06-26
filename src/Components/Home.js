import React, { Component } from 'react';


export class Home extends Component {
	
  	render() {
	    return (
	    	<div> 

				<div className="page-body">
				<div className="main-body">
					<div className="left-side">
						<img src={require('./images/self.jpg')} alt='Photo of Myself'/>

					</div>
					<div className="right-side">
						<h2 className="home-title">Welcome.</h2>
						<p>
							Hello and welcome to my website. My name is Renee 
							and I am a 4th year Computer Science major at UC 
							Santa Barbara. 
						</p>
						<p>
							I'm making this website for my class, CS 185: Human Computer Interaction.
							By exploring this website, you'll be able to see how I've utilized Google's Firebase as a database, OMDb API to extract
							movie information, and D3 to create a movie graph visualization. 
						</p>
						<p>I originally started this website using HTML/CSS and vanilla Javascript,
							then I transformed everything in ReactJS.
						</p>
						<div className="homepage-buttons">
							<button href='https://reneelabutay.github.io/cs185_portfolio/'>Link to Original Website</button>
							<button href='https://github.com/reneelabutay/cs185react_portfolio'>Github Repo for this project</button>
						</div>
						
					</div>
				</div>
				</div>
	    	</div>
	    );
  	}
}
export default Home;