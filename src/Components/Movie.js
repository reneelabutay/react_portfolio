import React, { Component } from 'react'
import Popup from 'reactjs-popup'
import firebase from '../firebase'
import TabList from './TabList';

export class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            year: '',
            director: '',
            poster: '',
            imdbRating: '',
            plot: '',
            rated: '',
            movieID: '',
            showMenu: '',
            allCustomLists: [],
            listsMovieBelongsTo: [],
            AddToListContent: []
        };
        this.getAllLists = this.getAllLists.bind(this);
        this.getThisMoviesLists = this.getThisMoviesLists.bind(this);
        this.getAddToListContent = this.getAddToListContent.bind(this);
        //this.addContent = this.addContent.bind(this);
    }

    async componentDidMount() {
        //collect the movie data
        //console.log("props id:")
        //console.log(this.props.id)
        const imdb_id = this.props.id.movieID
        const dataRef = firebase.database().ref('MovieList');
        dataRef.on('value', (snapshot) => {
            let movie_list = snapshot.val();
            for(let item in movie_list) {
                if(movie_list[item].movieID === imdb_id) {
                    this.setState({
                        title: movie_list[item].title,
                        year: movie_list[item].year,
                        director: movie_list[item].director,
                        poster: movie_list[item].poster,
                        imdbRating: movie_list[item].imdbRating,
                        plot: movie_list[item].plot,
                        rated: movie_list[item].rated,
                        movieID: imdb_id,
                        showMenu: false
                    })
                }
            }
        })
        await this.getAllLists();
        await this.getThisMoviesLists();
    }

    componentDidUpdate(prevProps) {
        if(prevProps != this.props) {
            this.componentDidMount();
        }
    }

    removeMovieFromLists() {
        const findThisID = this.state.movieID;
        const pairsRef = firebase.database().ref('MovieListPairs');
        pairsRef.orderByChild('movieID').equalTo(findThisID).once('value', snapshot => {
            const updates = {};
            snapshot.forEach(child => updates[child.key] = null);
            pairsRef.update(updates);
        });
    }

    async removeMovie(e) {
        console.log(this.state.movieID)
        console.log(this.state.title)
        const findThisID = this.state.movieID;
        const dataRef = firebase.database().ref('MovieList');
        dataRef.orderByChild('movieID').equalTo(findThisID).once('value', snapshot => {
            const updates = {};
            snapshot.forEach(child => updates[child.key] = null);
            dataRef.update(updates);
        });
        await this.removeMovieFromLists();
        window.location.reload();
        alert("Movie was successfully deleted!")
        //firebase.database().child('MovieList').orderByChild('movieID').equalTo(findThisID).remove();
    }

    getAllLists() {
        //e.preventDefault();
        console.log("in getalllists")
        const listRef = firebase.database().ref('Lists');
        listRef.on('value', (snapshot) => {
            let lists = snapshot.val();
            let allLists = [];
            //console.log(lists)
            for(let item in lists) {
                allLists.push(lists[item].listName);
            }
            //console.log(allLists)
            this.setState({
                allCustomLists: allLists
            });
        });
        
    }

    getThisMoviesLists() {
        //console.log("which list does this belong to?")
        //console.log("in getThisMoviesLists()")
        //console.log("current movie... " + this.state.title)
        const listRef = firebase.database().ref('MovieListPairs');
        listRef.on('value', (snapshot) => {
            let pairs = snapshot.val();
            let listItBelongsTo = [];
            for(let item in pairs) {
                //console.log("comparing " + pairs[item].movieID + " and " + this.state.movieID)
                if(pairs[item].movieID === this.state.movieID) {
                    //console.log("equal!!")
                    listItBelongsTo.push(pairs[item].listName)
                }
            }
            //console.log("this is the lists it belongs to")
            //console.log(listItBelongsTo)
            this.setState({
                listsMovieBelongsTo: listItBelongsTo
            })
        });
    }

    showDropdownMenu() {
        var menu = document.getElementById("dropdown")
        if (menu.style.display === "none" || menu.style.display === "") {
            menu.style.display = "block";
        }
        else {
            menu.style.display = "none";
        }
    }

    getAddToListContent(e) {
        e.preventDefault();
        console.log("current movie... " + this.state.title)
        const arr1 = this.state.allCustomLists;
        const arr2 = this.state.listsMovieBelongsTo;
        console.log("all lists: " + arr1)
        console.log("lists that this movie is in: " + arr2)
        let uniqueVals = arr1.filter(function(obj) { return arr2.indexOf(obj) == -1; });
        this.setState({
            AddToListContent: uniqueVals
        })
        this.showDropdownMenu();
    }

    /*addContent(listValue) {

        //push pair to firebase
        const listRef = firebase.database().ref('MovieListPairs');
        let newPair = {
            listName: listValue,
            movieID: this.state.movieID
        }
        

    }*/
    addToList(list) {
        const listRef = firebase.database().ref('MovieListPairs');
        let newPair = {
            listName: list,
            movieID: this.state.movieID
        }
        listRef.push(newPair);
        window.location.reload();
        alert("Movie was added to: " + list)
    }    
    render() {
        //console.log("in movie.js")
        //console.log(this.state)
        return(
            <div className="movie-card">
                <Popup modal trigger={<img src={this.state.poster}/>} lockScroll>
                {close => ( 
                    <div className="active-movie">
                        <a className="close" onClick={close}>
                            &times;
                        </a>
                        <div className="movie-poster">
                            <img src={this.state.poster}></img>
                        </div>
                        <div className="movie-content">
                            <p className="title">{this.state.title}</p>
                            <p className="director">Directed by {this.state.director}</p>
                            <p className="plot">{this.state.plot}</p>
                            <p className="rated">Rated {this.state.rated}</p>
                            <p className="imdb-rating">&#9733; IMDB Rating {this.state.imdbRating}</p>
                            <div className="movie-lightbox-buttons">
                                <button className="delete-movie-button" onClick={(e) => this.removeMovie(this.state.movieID, e)}>Delete Movie</button>
                                <div id="dropdown-container">
                                <button className="add-list-button"onClick={this.getAddToListContent}>Add to List &#x25BC;</button>
                                    <div id="dropdown">
                                    {this.state.AddToListContent.map((list) => {
                                        return <a onClick={() => {this.addToList(list)}}>{list}</a>
                                    })}
                                    </div>
                                </div>
                                    
                                
                            </div>
                        </div> 
                    </div>
                )}
                </Popup>
          </div>
           
        )
    }

}
export default Movie;