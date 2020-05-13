import React, { Component } from 'react'
import MovieGallery from './MovieGallery'


export class Movies extends Component {

    render() {

        return(
            <div> 
	    		<div className="page-body">
					<h2 className="page-title">My Favorite movies</h2>
					    <p>Below are some of my favorite movies. </p>
					<div className="movie-body">
                        <MovieGallery/>
					</div>
					
					
				</div>

	    	</div> 
        );
    }
}
export default Movies;