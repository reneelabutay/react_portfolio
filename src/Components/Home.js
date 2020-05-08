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
							and I am a third year Computer Science major at UC 
							Santa Barbara. I hope you have a great time exploring 
							my website.
						</p>
						<p>
							To tell you more about myself, I was born and raised 
							in the Bay Area. I am a huge foodie. I love exploring new 
							restaurants and baking delicacies. Some of my favorite 
							foods are sushi, matcha lattes, and chocolate croissants. 
							I am currently on the search for the perfect chocolate chip 
							cookie recipe. 
						</p>
						<p>
							To offset the vast amounts of food I consume everyday, 
							I spend most of my free time bodybuilding and 
							weightlifting. I enjoy living an active lifestyle. 
							I grew up playing sports and used to be part of the UCSB 
							Rowing Team. At the gym, there's no better feeling than achieving
							 your strength goals. 
						</p>
					</div>
				</div>
				</div>
	    	</div>
	    );
  	}
}
export default Home;