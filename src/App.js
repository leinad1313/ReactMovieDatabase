import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Search from "./Search/Search";
import axios from "axios";
import Movie from "./Movie/Movie";
import ChangePageButton from "./Buttons/changePageButton";

const GET_URL = "https://api.themoviedb.org/3/search/movie?api_key=31f99a5112e3c60e601cd6675e68e985&language=en-US&query=";

export default class App extends React.Component {


    state = {
        movies: [],
        page: 0,
        title: '',
        total_results: '0'
    };


    sendSearchBarRequest = async title => {
        try
        {
            const {data: movies} = await axios.get(
                GET_URL + title + "&page=1&include_adult=true"
            );
            this.setState({
                movies: movies.results,
                page: 1,
                title: title,
                total_results: movies.total_results
            });
        }
        catch
        {
            console.log("Error, can't load data from TMDB API!");
        }
    };

    sendPageRequest = async button => {
        let page = 0;

        if (button === "Next Page")
        {
            page = this.state.page + 1;
        }
        else
        {
            if (this.state.page === 1)
            {
                return;
            }
            page = this.state.page-1;
        }

        const {data: movies} = await axios.get(
            GET_URL + this.state.title + "&page=" + page + "&include_adult=true"
        );
        window.scrollTo(0, 0);
        this.setState({page: page});
        this.setState({movies: movies.results});

    };



    searchLocalStorage = (movie) => {
        let fetchedMovie = JSON.parse(localStorage.getItem(movie.id));
        if (fetchedMovie) {
            movie = fetchedMovie;
        }
        return movie;
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 id="App-h1">Movie Database</h1>
                    <Search handleSendRequest={this.sendSearchBarRequest}/>
                    <p>{this.state.total_results} Movies found!</p>
                </header>
                <main className="App-main">
                    {this.state.movies.map( movie => <Movie key={movie.id} movie={this.searchLocalStorage(movie)}/>)}
                </main>
                <footer className="App-footer">
                    <ChangePageButton btnContainerClassNames="container-prev" name={"Previous Page"} handleSendRequest={this.sendPageRequest}/>
                    <ChangePageButton btnContainerClassNames="container-next" name={"Next Page"} handleSendRequest={this.sendPageRequest}/>
                </footer>
            </div>
        );
    }

}


