import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js';
import $ from 'jquery'

class App extends Component {
constructor(props) {
  super(props)
  this.state = {}
  // console.log("This is my initializer")

  // const movies = [
  //   {id: 0, poster_src: "https://image.tmdb.org/t/p/w185_and_h278_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", title: "Avengers: Infinity War", overview: "lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor"},
  //   {id: 1, poster_src: "https://image.tmdb.org/t/p/w185_and_h278_bestv2/mUjWof8LHDgCZC9mFp0UYKBf1Dm.jpg",title: "Spider Man", overview: "This is the second overview"},
  // ]

  // var movieRows = []
  // movies.forEach((movie) => {
  //   console.log(movie.title)
  //   const movieRow = <MovieRow movie={movie} />
  //   movieRows.push(movieRow)
  // })

  // this.state = {rows: movieRows}

  this.performSearch("avengers")
}


  performSearch(searchTerm) {
    console.log("Perform search using moviedb")
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=75d4e6f5544ff8456a0811747cd74629&query=" + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully")
        //console.log(searchResults)
        const results = searchResults.results
        //console.log(results)
        
        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + movie.poster_path
          //console.log("https://image.tmdb.org/t/p/w185_and_h278_bestv2" + movie.backdrop_path)
          //console.log(movie.poster_path)
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        console.log(movieRows)
        this.setState({rows: movieRows})

      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }

  searchChangeHandler(event) {
    console.log(event.target.value)
    const searchTerm = event.target.value
    this.performSearch(searchTerm)
  }

  render() {
    return (
      <div>
        <table className="titleBar">
            <tbody>
            <tr>
                <td>
                <img alt="app icon" width="50" src="https://www.themoviedb.org/assets/1/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg" />
                </td>
                <td width="8"/>
                <td>
                <h1>MoviesDB Search</h1>
                </td>
            </tr>
            </tbody>
        </table>

        <input style={{
            frontSize: 24,
            display: 'block',
            width: "99%",
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16
        }} onChange={this.searchChangeHandler.bind(this)} placeholder="Search for a movie" />
          
        {this.state.rows}

      </div>
    );
  }
}

export default App;
