import React, { Component } from 'react';

export class Projects extends Component {
	
  	render() {
	    return (
	    	<div> 
	    		<div className="page-body">
					<h2 className="page-title">Projects</h2>
					<p>Below are some of the projects that I have completed. 
					Click on the icons to learn more. </p>

					<div className="projects-body">
						<div className="project-row">
							<div className="project-item">
								<a href="https://github.com/reneelabutay/CS165_AI_Pacman">
									<img src="https://img.icons8.com/cotton/200/000000/pacman.png"/>
								</a>
								<h3>Pacman AI</h3>
								<p>
									An application AI techniques. Implemented graph search 
									algorithms, reinforcement learning, and machine learning to 
									help the Pacman agent collect all the points while avoiding the 
									ghosts. 
								</p>
							</div>
							
							<div className="project-item">
								<a href="https://github.com/reneelabutay/CS130a_prog1">
									<img border="0" src={require('./images/ds.png')} width="200" height="200"/>
								</a> 
								<h3>Quash</h3>
								<p>
									Construction of a priority queue and hash table compound 
									data structure in C++ primarily used to store IP addresses. 
									Supported insert, delete, and lookup functions.
								</p>
							</div>
						</div>
					</div>
					
					
				</div>

	    	</div>
	    );
  	}
}
export default Projects;