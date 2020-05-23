import React, { Component } from 'react'
import Movie from './Movie'
import firebase from '../firebase'


export class MovieGallery extends Component {
	constructor(props){
		super(props);
		this.state = {
			movieIDs: ["tt4501244", "tt3104988", "tt1570728", "tt5164432", "tt1632708",
			"tt1045658", "tt1638002", "tt1564367", "tt7374948"]
		}
	}
    render() {
        return(
            <div> 
	    		<div className="page-body">

					<form className="movie-search">
						<p className="search-movie">
								<input type="text" name="searchMovie" placeholder="Search for a Movie..."></input>
								<button type="submit" className="movie-search-button"><i class="fa fa-search"></i></button>
						</p>
					</form>
					<form className="add-movie">
						<p className="add-movie">
							<h3>Add a Movie</h3>
							<label>Enter IMDbID</label>
							<input type="text" name="movie-id"></input>
						</p>
					</form>

					<h2 className="page-title">Movie Gallery</h2>
					<div className="movie-body">
						{this.state.movieIDs.map((movie) => {
							return <Movie id={movie}/>
						})}
					</div>
				</div>
	    	</div> 
        );
    }
}
export default MovieGallery;