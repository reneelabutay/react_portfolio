import React, { Component } from 'react';
import ReactPlayer from 'react-player';


export class Recipes extends Component {
	
  	render() {
	    return (
	    	<div> 
	    		<div className="page-body">
				<h2 className="page-title">Recipes</h2>
				<div className="recipes-page">
					<p>
						Cooking and baking are my favorite hobbies. There's nothing 
						better than creating something delicious to share with my loved ones. 
						While I have been spending most of my time at home, I have been eager 
						to try new recipes. Here are some of the recipes I have tried or 
						will try.
					</p>
					<div className="video-container">
						<div className="video-item">
							<iframe width="420" height="315" 
							src="https://www.youtube.com/embed/enYzkr98_8M">
							</iframe>
							<p>Hokkaido Milk Bread</p>
						</div>

						<div className="video-item">
							<iframe width="420" height="315" 
							src="https://www.youtube.com/embed/_Q0FYoCl4Cs">
							</iframe>
							<p>Cinnamon Rolls</p>
						</div>
					</div>

					<div className="video-container">
						<div className="video-item">
							<iframe width="420" height="315" 
							src="https://www.youtube.com/embed/yRMELL28TAk">
							</iframe>
							<p>Mochi Donuts</p>
						</div>

						<div className="video-item">
							<iframe width="420" height="315" 
							src="https://www.youtube.com/embed/wagOH0eLZmE">
							</iframe>
							<p>Pain Au Chocolat</p>
						</div>
					</div>

					<div className="video-container">
						<div className="video-item">
							<iframe width="420" height="315" 
							src="https://www.youtube.com/embed/17lp_x27_RI">
							</iframe>
							<p>BA's Chocolate Chip Cookies</p>
						</div>

						<div className="video-item">
							<iframe width="420" height="315" 
							src="https://www.youtube.com/embed/7VTtenyKRg4">
							</iframe>
							<p>Tiramisu</p>
						</div>
					</div>
					<p>
						*Disclaimer: I do not own claim ownership over any of these videos therefore all content in these videos belong to their respective owners.
					</p>
	    		</div>
	    	</div>
	    	</div>
	    );
  	}
}
export default Recipes;