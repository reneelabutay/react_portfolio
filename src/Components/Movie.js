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
            listsMovieBelongsTo: []
        };
        this.getAllLists = this.getAllLists.bind(this);
    }

    componentDidMount() {
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
        this.getAllLists();
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
    removeMovie(e) {
        console.log(this.state.movieID)
        console.log(this.state.title)
        const findThisID = this.state.movieID;
        const dataRef = firebase.database().ref('MovieList');
        dataRef.orderByChild('movieID').equalTo(findThisID).once('value', snapshot => {
            const updates = {};
            snapshot.forEach(child => updates[child.key] = null);
            dataRef.update(updates);
        });
        this.removeMovieFromLists();

        window.location.reload(false);
        //firebase.database().child('MovieList').orderByChild('movieID').equalTo(findThisID).remove();
    }

    getAllLists() {
        //e.preventDefault();
        console.log("in getalllists")
        const listRef = firebase.database().ref('Lists');
        listRef.on('value', (snapshot) => {
            let lists = snapshot.val();
            let allLists = [];
            console.log(lists)
            for(let item in lists) {
                allLists.push({
                    listName: lists[item].listName,
                });
            }
            console.log(allLists)
            this.setState({
                allCustomLists: allLists
            });
        });
        this.getThisMoviesList();
    }

    getThisMoviesList() {
        console.log("which list does this belong to?")
        const listRef = firebase.database().ref('MovieListPairs');
        listRef.on('value', (snapshot) => {
            let pairs = snapshot.val();
            console.log(pairs)
        });
    }
    

    
    render() {
        console.log("in movie.js")
        console.log(this.state)
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
                                <button className="add-list-button" onClick={this.getAllLists}>Add to List &#x25BC;</button>
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