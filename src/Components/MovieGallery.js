import React, { Component } from 'react'
import axios from 'axios'
import MovieData from '../MovieData.json'
import Movies from './Movies';
// import Movie from './Movie'

const movieIDs = ["tt0454921", "tt0319343", "tt0454921", "tt0454921","tt0454921",
"tt0454921", "tt0454921", "tt0454921"]

export class MovieGallery extends Component {
   
    constructor() {
        super();
        this.state = {
            activeMovie: '',
            data: []
        }
 
    }
 
    componentDidMount() {
        //get the data and then push it onto movieData []
        var movieData = this.collectMovieData();
        //console.log(this.state.movieData)
        
        //display movie gallery
        this.displayGallery(movieData);
    }
    
    collectMovieData() {
        let movieData = [...this.state.data];
        for (var i = 0; i < movieIDs.length; i++) {
            axios.get('http://www.omdbapi.com/?apikey=cd9efcf2&i=' + movieIDs[i])
            .then (function (response) {
                movieData.push(response.data);
            })
        }
        this.setState({data: movieData});
        return movieData;

    }

    displayGallery(movdata) {
        //use the movieData[] to display the posters
        console.log("in display Gallery")
        console.log(movdata)
        movdata && movdata.map((movie) => {
            return <img alt="poster" src={movie.Poster}/>
        })
    }

    
    render() {
        console.log("testing Movie Gallery")
        return(
            <p>hi</p>
        )
    }

}
export default MovieGallery;