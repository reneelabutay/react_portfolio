import React, { Component } from 'react'
import axios from 'axios'
import Popup from "reactjs-popup"

export class MovieGallery extends Component {
   
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
                <img src={this.state.poster}></img>
            </div>
            
           
        )
    }

}
export default MovieGallery;