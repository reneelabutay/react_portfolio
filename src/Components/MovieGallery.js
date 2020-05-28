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
			director: '',
			poster: '',
			imdbRating: '',
			plot: '',
			rated: '',
			searchTerm: '',
			movie_list: [] // state of ALL MOVIES from firebase data
			// movieIDs: ["tt4501244", "tt3104988", "tt1570728", "tt5164432", "tt1632708",
			// "tt1045658", "tt1638002", "tt1564367", "tt7374948"]
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleAddMovie = this.handleAddMovie.bind(this);
		this.handleSearchMovie = this.handleSearchMovie.bind(this);
		
	}
	
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	
	async loadMovieInfo(){
		//console.log("in updateTITLE...")
		const movieID = this.state.movieID;
		console.log("movie id:")
		console.log(movieID)
		await axios.get('https://www.omdbapi.com/?apikey=cd9efcf2&i=' + movieID)
		.then (response => {
			//console.log("in axios part")
			this.setState({
				movieID: response.data.imdbID, 
				title: response.data.Title,
				year: response.data.Year,
                director: response.data.Director,
                poster: response.data.Poster,
				imdbRating: response.data.imdbRating,
				plot: response.data.Plot,
                rated: response.data.Rated,
			})
			console.log(this.state.title) // printed
		})
	}

	async handleAddMovie(e) {
		e.preventDefault();
		await this.loadMovieInfo(); //figure out async 
		const dataRef = firebase.database().ref('MovieList');		
		//checks for duplicates
		var duplicates = false;
		dataRef.on('value', (snapshot) => {
			let movie_list = snapshot.val();
			for (let item in movie_list) {
				//console.log("in loop")
				//console.log(movie_list[item])
				//console.log(movieItem.movieID)
				if(movie_list[item].movieID ==  this.state.movieID) {
					duplicates = true;
					break;
				}
			}
		});
		let movieItem = {
			movieID: this.state.movieID,
			title: this.state.title,
			year: this.state.year,
			director: this.state.director,
			poster: this.state.poster,
			imdbRating: this.state.imdbRating,
			plot: this.state.plot,
			rated: this.state.rated
		}
		console.log("movie item...")
		console.log(movieItem)
		//pushes movie item to firebase 
		if (duplicates) {
			alert("ERROR: This movie has already been added. Try another one.");
		} else {
			dataRef.push(movieItem);
			this.setState({
				movieID: '',
				title: '',
				director: '',
				poster: '',
				imdbRating: '',
				plot: '',
				rated: '',
				searchTerm: '',
			});
			alert("Movie was successfully added!");
		}
	}	

	handleSearchMovie(e) {
		e.preventDefault();
		const searchWord = this.state.searchTerm;
		console.log("in search, this is searchWord...")
		console.log(searchWord)
		
		const dataRef = firebase.database().ref('MovieList');
		dataRef.on('value', (snapshot) => {
			let movie_list = snapshot.val();
			console.log("movie_list (from firebase)...")
			console.log(movie_list)
			let searchItems = [];
			for(let item in movie_list) {
				console.log(movie_list[item].title)
				console.log(searchWord)
				let currentTitle = movie_list[item].title
				//if(typeof currentTitle === 'string' && typeof searchWord === 'string') {
				//	console.log("both are strings")
				//}
				if(currentTitle === searchWord) {
					console.log("FOUND ITEM!")
					searchItems.push({
						movieID: movie_list[item].movieID,
						title: movie_list[item].title,
						director: movie_list[item].director,
						poster: movie_list[item].poster,
						imdbRating: movie_list[item].imdbRating,
						plot: movie_list[item].plot,
						rated: movie_list[item].rated,
					});
					break;
				}
			}
			//console.log("searchItem after loop..")
			//console.log(searchItem)
			this.setState({
				movie_list: searchItems
			})
		})
		//console.log(this.state.movie_list)
		//go through each id
		//do an axios.get and get each title
		//compare axios title with the desired movie
		//axios.get('https://www.omdbapi.com/?apikey=cd9efcf2&i=' + movieID)
	}

	componentDidMount() {
		const dataRef = firebase.database().ref('MovieList');
		dataRef.on('value', (snapshot) => {
			let movie_list = snapshot.val();
			let newState = [];
			for(let item in movie_list) {
				newState.push({ 
					movieID: movie_list[item].movieID,
					title: movie_list[item].title, 
					director: movie_list[item].director,
					poster: movie_list[item].poster,
					imdbRating: movie_list[item].imdbRating,
					plot: movie_list[item].plot,
					rated: movie_list[item].rated,
				});
			}
			this.setState({
				movie_list: newState
			});
		});
	}
	/*
	componentDidUpdate(prevProps, prevState) {
		if (prevState.movie_list !== this.state.movie_list) {
			console.log("change has been made!")
			//window.location.reload();
		}
	}*/

    render() {
		console.log("this.state.movie_list")
		console.log(this.state.movie_list)
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
					<form className="movie-searchbar" onSubmit={this.handleSearchMovie}>
						<p className="search-movie">
							<input type="text" name="searchTerm" placeholder="Search for a Movie..."
							onChange={this.handleChange} value={this.state.searchTerm}></input>
							<button type="submit" className="movie-search-button">
								<FaSearch size={24}/>
							</button>
						</p>
					</form>
					<h2 className="page-title">Movie Gallery</h2>
					<div className="movie-body">
						{this.state.movie_list.map((movie) => {
							console.log("this is the movie..")
							console.log({movie})
							return <Movie id={movie}/>
						})}
					</div>
				</div>
	    	</div> 
        );
    }
}
export default MovieGallery;