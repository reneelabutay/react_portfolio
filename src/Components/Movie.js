import React, { Component } from 'react'
import axios from 'axios'
import Popup from 'reactjs-popup'


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
        }
    }
    componentDidMount() {
        //collect the movie data
        axios.get('http://www.omdbapi.com/?apikey=cd9efcf2&i=' + this.props.id)
        .then (response => {
            this.setState({
                title: response.data.Title,
                year: response.data.Year,
                director: response.data.Director,
                poster: response.data.Poster,
                imdbRating: response.data.imdbRating,
                plot: response.data.Plot,
                rated: response.data.Rated,
            })     
        }) 
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
                        </div>
                        
                    </div>
                )}
                </Popup>
          </div>
           
        )
    }

}
export default Movie;