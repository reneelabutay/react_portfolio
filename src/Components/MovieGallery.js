import React, { Component } from 'react'
import Movie from './Movie'
import firebase from '../firebase'
import axios from 'axios'
import { FaSearch } from 'react-icons/fa'
import { MdAddCircle } from 'react-icons/md'


export class MovieGallery extends Component {
	constructor(){
		super();
		this.state = {
			movieID: '',
			title: '',
			searchTerm: '',
			movie_list: []
			// movieIDs: ["tt4501244", "tt3104988", "tt1570728", "tt5164432", "tt1632708",
			// "tt1045658", "tt1638002", "tt1564367", "tt7374948"]
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleAddMovie = this.handleAddMovie.bind(this);
		
	}
	
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
/*

*//*
	addMovie() {
		//
		
		
		//checks for duplicates
		//var duplicates = false;
		//dataRef.on('value', (snapshot) => {
		//	let movie_list = snapshot.val();
		//	for (let item in movie_list) {
				//console.log("in loop")
				//console.log(movie_list[item])
				//console.log(movieItem.movieID)
		//		if(movie_list[item].movieID ==  movieItem.movieID) {
		//			duplicates = true;
		//			break;
		//		}
		//	}
	//	});
		//pushes movie item to firebase 
	//	if (duplicates) {
	//		alert("ERROR: This movie has already been added. Try another one.");
	//	} else {
	//		dataRef.push(movieItem);
	//		this.setState({
	//			movieID:'',
	//			title:'',
	//			searchTerm:''
	//		});
	//		alert("Movie was successfully added!");
	//	}
	} */
	
	updateTitle(){
		console.log("in updateTITLE...")
		const movieID = this.state.movieID;
		//console.log("movie id:")
		//console.log(movieID)
		axios.get('https://www.omdbapi.com/?apikey=cd9efcf2&i=' + movieID)
		.then (response => {
			console.log("in axios part")
			this.setState({
				title: response.data.Title,
			})
			console.log(this.state.title) // printed
		})

	}

	handleAddMovie(e) {
		e.preventDefault();
		const dataRef = firebase.database().ref('MovieList');
		console.log("in handle add movie")
		
		this.updateTitle();

		const movieItem = {
			movieID: this.state.movieID,
			title: this.state.title
		}
		console.log("movie item....")
		console.log(movieItem)
		
		//checks for duplicates
		var duplicates = false;
		dataRef.on('value', (snapshot) => {
			let movie_list = snapshot.val();
			for (let item in movie_list) {
				console.log("in loop")
				console.log(movie_list[item])
				console.log(movieItem.movieID)
				if(movie_list[item].movieID ==  movieItem.movieID) {
					duplicates = true;
					break;
				}
			}
		});
		//pushes movie item to firebase 
		if (duplicates) {
			alert("ERROR: This movie has already been added. Try another one.");
		} else {
			dataRef.push(movieItem);
			this.setState({
				movieID:'',
				title:'',
				searchTerm:''
			});
			alert("Movie was successfully added!");
		}
	}	
		
		
		
		/*
		e.preventDefault();
		const movieID = this.state.movieID;
		console.log("movie id:")
		console.log(movieID)
		axios.get('https://www.omdbapi.com/?apikey=cd9efcf2&i=' + movieID)
		.then (response => {
			console.log("in axios part")
			this.setState({
				title: response.data.Title,
			})
			//console.log(response.data)
			//console.log(response.data.Title)
			console.log(this.state.title) // printed
		})	*/
				
		
		//const movieID = this.state.movieID;
		//console.log("movie id:")
		//console.log(movieID)


	

	componentDidMount() {
		const dataRef = firebase.database().ref('MovieList');
		dataRef.on('value', (snapshot) => {
			let movie_list = snapshot.val();
			let newState = [];
			for(let item in movie_list) {
				newState.push({ 
					movieID: movie_list[item].movieID,
					title: movie_list[item].title
				});
			}
			this.setState({
				movie_list: newState
			});
		});
	}
	
    render() {
		//console.log("movie_list:");
		//console.log(this.state.movie_list);
        return(
            <div> 
	    		<div className="page-body">
					<form className="add-movie-form" onSubmit={this.handleAddMovie}>
						<label>Add a Movie to the Movie Gallery</label>
						<p className="add-movie">
							<button type="submit" className="add-movie-button">
									<MdAddCircle size={24}/>
							</button>
							<input type="text" name="movieID" placeholder="Enter IMDb ID..."
							onChange={this.handleChange} value={this.state.movieID}></input>
						</p>
					</form>
					<form className="movie-searchbar">
						<p className="search-movie">
								<input type="text" name="searchMovie" placeholder="Search for a Movie..."></input>
								<button type="submit" className="movie-search-button" >
									<FaSearch size={24}/>
								</button>
						</p>
					</form>

					<h2 className="page-title">Movie Gallery</h2>
					<div className="movie-body">
						{this.state.movie_list.map((movie) => {
							return <Movie id={movie}/>
						})}
					</div>
				</div>
	    	</div> 
        );
    }
}
export default MovieGallery;