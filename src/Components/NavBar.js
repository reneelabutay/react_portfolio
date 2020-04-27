import React, { Component } from 'react';

const NavBar = props => (
	<header className="NavBar">
		<nav>
			<div className="logo">
				Renee Labutay
			</div>
			<ul className="nav-bar">
				<li><a href="index.html">Home</a></li>
				<li><a href="aboutme.html">About Me</a></li>
				<li><a href="projects.html">Projects</a></li>
				<li><a href="photography.html">Photography</a></li>
				<li><a href="videos.html">Recipes</a></li>
			</ul>
			<div className="lines">
				<div className="line1"></div>
				<div className="line2"></div>
				<div className="line3"></div>
			</div>
		</nav>
	</header>

);

export default NavBar;



