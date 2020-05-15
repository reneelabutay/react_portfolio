import React, { Component } from 'react'
import MovieGallery from './MovieGallery'


export class Movies extends Component {
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
					<h2 className="page-title">My Favorite Movies</h2>
					<div className="movie-body">
						{this.state.movieIDs.map((movie) => {
							return <MovieGallery id={movie}/>
						})}
					</div>
				</div>
	    	</div> 
        );
    }
}
export default Movies;