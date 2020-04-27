import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'

export class HamburgerMenu extends Component {
  render() {
  	return (
  		<Menu>
  			<a id='home' className="menu-item" href="/">Home</a>
  			<a id='projects' className="menu-item" href="/Projects">Projects</a>
  			<a id='photgraphy' className="menu-item" href="/Photography">Photography</a>
  			<a id='recipes' className="menu-item" href="/Recipes">Recipes</a>
  		</Menu>
  	);
  }
}

export default HamburgerMenu;


