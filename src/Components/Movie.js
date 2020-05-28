import React, { Component } from 'react'
import axios from 'axios'
import Popup from 'reactjs-popup'
import firebase from '../firebase'

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
            movieID: ''
        }
    }
    componentDidMount() {
        //collect the movie data
        //console.log("props id:")
        //console.log(this.props.id.movieID)
        const imdb_id = this.props.id.movieID
        const dataRef = firebase.database().ref('MovieList');
        dataRef.on('value', (snapshot) => {
            let movie_list = snapshot.val();
            let newState = [];
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
                        movieID: imdb_id
                    })
                }
            }
        })
        
        /*axios.get('https://www.omdbapi.com/?apikey=cd9efcf2&i=' + imdb_id)
        .then (response => {
            this.setState({
                title: response.data.Title,
                year: response.data.Year,
                director: response.data.Director,
                poster: response.data.Poster,
                imdbRating: response.data.imdbRating,
                plot: response.data.Plot,
                rated: response.data.Rated,
                movieID: imdb_id
            })     
        })*/
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
        window.location.reload(false);
        //firebase.database().child('MovieList').orderByChild('movieID').equalTo(findThisID).remove();
    }
    
    render() {
        
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
                            <button className="delete-movie-button" onClick={(e) => this.removeMovie(this.state.movieID, e)}>Delete Movie</button>
                        </div> 
                    </div>
                )}
                </Popup>
          </div>
           
        )
    }

}
export default Movie;