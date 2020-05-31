import React, { Component } from 'react'
import Movie from './Movie'
import firebase from '../firebase'
import { FaSearch } from 'react-icons/fa'
import AddMovie from './AddMovie'
import CreateList from './CreateList'


export class MovieGallery extends Component {
	constructor(){
		super();
		this.state = {
			searchTerm: '',
			movie_list: [], // list of movies that will be displayed
			// movieIDs: ["tt4501244", "tt3104988", "tt1570728", "tt5164432", "tt1632708",
			// "tt1045658", "tt1638002", "tt1564367", "tt7374948"]
			customLists: [],
			activeList: 'All',
			numLoaded: 8,
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSearchMovie = this.handleSearchMovie.bind(this);
		this.getListTitles = this.getListTitles.bind(this);
		this.displayList = this.displayList.bind(this);
		this.changeActiveList = this.changeActiveList.bind(this);
		this.loadMore = this.loadMore.bind(this);
	}
	
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSearchMovie(e) {
		e.preventDefault();
		const searchWord = this.state.searchTerm;
		const dataRef = firebase.database().ref('MovieList');
		dataRef.on('value', (snapshot) => {
			let movie_list = snapshot.val();
			let searchItems = [];
			for(let item in movie_list) {
				let currentTitle = movie_list[item].title
				if(currentTitle === searchWord) {
					//console.log("FOUND ITEM!")
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
			this.setState({
				movie_list: searchItems
			})
		})
	}

	//gets list of titles
	getListTitles() {
		const dataRef = firebase.database().ref('Lists');
		dataRef.on('value', (snapshot) => {
			let lists = snapshot.val();
			let newListEntry = [];
			for (let item in lists) {
				newListEntry.push(lists[item].listName)
			}
			this.setState({
				customLists: newListEntry
			})
		});
	}

	//displaying the data
	//needs pagination
	componentDidMount() {
		this.loadMovies();
		this.getListTitles();
	}

	loadButtonDisplay(count) {
		console.log("in load button function")
		console.log(this.state.activeList)
		var loadBtn = document.getElementById("load-btn");
		console.log(count)
		console.log(this.state.numLoaded)


		if(count < this.state.numLoaded) {
			console.log("going to hide load btn")
			loadBtn.style.display = "none";
		} else {
			console.log("showing load btn")
			loadBtn.style.display = "block";
		}
		
		
	}

	async loadMovies() {
		const loadLimit = this.state.numLoaded;
		console.log("in load movies, loading ALLL")
		console.log(loadLimit)
		const dataRef = firebase.database().ref('MovieList').orderByKey();
		dataRef.limitToFirst(loadLimit + 1).on('value', (snapshot) => {
			let movieData = snapshot.val();
			//let count = movieData.length;
			let newState = [];
			for(let item in movieData) {
				newState.push({ 
					movieID: movieData[item].movieID,
					title: movieData[item].title, 
					director: movieData[item].director,
					poster: movieData[item].poster,
					imdbRating: movieData[item].imdbRating,
					plot: movieData[item].plot,
					rated: movieData[item].rated,
				});
			}
			//console.log("length...")
			//console.log(newState.length)
			/*if(newState.length <= this.state.numLoaded) {
				console.log("hide the load more button!")
				this.hideLoadButton();
			}*/
			this.loadButtonDisplay(newState.length);
			this.setState({
				movie_list: newState
			});
		});
	}
	
	changeActiveList(list) {
		this.setState({
			activeList: list,
			numLoaded: 8
		})
	}

	//needs pagination
	async displayList(list) {
		console.log("in display list")
		//displaying the movies in the selected list
		if(this.state.activeList != list) {
			console.log("going to change active list and reset load limit to 8")
			await this.changeActiveList(list);
		}
		if(this.state.activeList === 'All') {
			this.loadMovies();
		}
		
		const loadLimit = this.state.numLoaded;
		console.log("load limit...")
		console.log(loadLimit)
		const listRef = firebase.database().ref('MovieListPairs');
		listRef.on('value', (snapshot) => {
			let pairs = snapshot.val();
			console.log(pairs)
			let listContent = [];
			for(let item in pairs) {
				if(pairs[item].listName === list) {
					console.log("length...")
					console.log(listContent.length)
					if(listContent.length < loadLimit) {
						listContent.push({
							movieID: pairs[item].movieID
						})
					}
				}
			}
			console.log(listContent)
			this.loadButtonDisplay(listContent.length);
			/*if(listContent.length < loadLimit) {
				console.log("list content is less than loadlimit")
				console.log(listContent.length)
				console.log(loadLimit)
				this.hideLoadButton();
			} */
			
			this.setState({
				movie_list: listContent
			})
		});
		//console.log(list)
	}

	addStyling = (list)  => {
		//console.log("in addstyling")
		//console.log("list...")
		//console.log(list.listItem)
		if(list.listItem === this.state.activeList) {
			return {backgroundColor: '#666', color:'#e3e4e0'}
		} else {
			return {backgroundColor: '#f1f1f1'}
		}
	}

	async loadMore() {
		await this.setState({
			numLoaded: this.state.numLoaded + 8
		})
		if(this.state.activeList != 'All') {
			console.log("not in all ")
			console.log(this.state.activeList)
			this.displayList(this.state.activeList);
		} else {
			console.log("loading all")
			this.loadMovies();
		}
		
	}

	
	

    render() {
		//console.log("this.state.movie_list")
		//console.log(this.state.movie_list)
		//console.log("custom lists")
		//console.log(this.state.customLists)
		//console.log("listttt")
		//console.log(this.state.activeList)
        return(
            <div> 
	    		<div className="page-body">
					<form className="movie-searchbar" onSubmit={this.handleSearchMovie}>
						<p className="search-movie">
							<input type="text" name="searchTerm" placeholder="Search for a Movie..."
							onChange={this.handleChange} value={this.state.searchTerm}></input>
							<button type="submit" className="movie-search-button">
								<FaSearch size={24}/>
							</button>
						</p>
					</form>
					<div className="movie-list-section">
						<div className="list-menu">
							{this.state.customLists.map((listItem) => {
										return <button className="list-btn" id={listItem} onClick={() => {this.displayList(listItem)}}
										style={this.addStyling({listItem})}>
											{listItem}
										</button>
							})}
						</div>
						<div>
							<CreateList/>
						</div>
					</div>
					<div className="movie-body">
						{this.state.movie_list.map((movie) => {
							//console.log("this is the movie..")
							//console.log({movie})
							return <Movie id={movie}/>
						})}
						
					</div>
					<div className="load-more">
						<button className="load-more-button" id="load-btn" onClick={this.loadMore}>Load More</button>
					</div>
					
				</div>
				<div className="header-container">
					<p>Add New Movies</p>
				</div>
				
				<AddMovie/>
				
			
	    	</div> 
        );
    }
}
export default MovieGallery;