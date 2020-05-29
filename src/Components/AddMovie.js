import React, { Component } from 'react';
import firebase from '../firebase'
import axios from 'axios'
import { MdAddCircle } from 'react-icons/md'

export class AddMovie extends Component {
    constructor() {
        super();
        this.state = {
            movieID: '',
			title: '',
			director: '',
			poster: '',
			imdbRating: '',
			plot: '',
			rated: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAddMovie = this.handleAddMovie.bind(this);
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

	async addtoALLMoviesList() {
		const pairRef = firebase.database().ref('MovieListPairs');	
		let pair = {
			movieID: this.state.movieID,
			listName: 'All'
		}
		pairRef.push(pair);
		alert("added to movie list pair")
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
			await this.addtoALLMoviesList();
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

	
  	render() {
	    return (
            <div>
                <div className="page-body">
                    <form className="add-movie-form" onSubmit={this.handleAddMovie}>
                        <label>Add a Movie to the Movie Gallery</label>
                        <p className="add-movie">
                            <button type="submit" className="add-movie-button" id="create-list-add">
                                    <MdAddCircle size={24}/>
                            </button>
                            <input type="text" name="movieID" placeholder="Enter IMDb ID..."
                            onChange={this.handleChange} value={this.state.movieID}></input>
                        </p>
                    </form>
                </div>
            </div>
        )
  	}
}
export default AddMovie;