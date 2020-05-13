import React, { Component } from 'react'

export class Movie extends Component {
    state = {
        movieData: {}
    };

    render() {
        const {
            Title, 
            Director, 
            imdbRating, 
            Poster,
            Plot
        } = this.state.movieData;
    
        return (
            <div>
                <div className="movie">
                    <img src="url(${Poster})"/>
                </div>

                

            </div>

        );
    }
}