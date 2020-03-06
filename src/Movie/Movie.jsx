import React from 'react';
import "./Movie.css";
import Button from 'react-bootstrap/Button';
import NoImageFound from '../img/no-image-available.jpg';

export default class Movies extends React.Component {

    constructor(props) {
        super(props);
        let movie = props.movie;
        if (movie.poster_path == null)
        {
            movie.poster_path = NoImageFound;
        }
        else
        {
            movie.poster_path = movie.poster_path.replace("https://image.tmdb.org/t/p/original/", "");
            movie.poster_path = "https://image.tmdb.org/t/p/original/"  + movie.poster_path;
        }
    }

    state= {
        title: this.props.movie.title,
        release_date: this.props.movie.release_date,
        edit: false
    };


    handleInputTitle = (event) => {
        event.preventDefault();
        const title = event.target.value;
        this.setState({title});
    };

    handleInputYear = (event) => {
        event.preventDefault();
        const release_date = event.target.value;
        this.setState({release_date});
    };

    handleInputEdit = () => {
        const edit = !this.state.edit;
        this.setState({edit});
    };

    titleContainer = () => {
        if(this.state.edit)
        {
          return <div className="title-container rounded">
              <input onChange={this.handleInputTitle} type="text" className="title form-control movie-input" required={true} value={this.state.title}/>
              <input onChange={this.handleInputYear} type="date" className="year form-control movie-input" required={true} value={this.state.release_date}/>
          </div>
        }
        else
        {
          return <div className="title-container rounded">
              <p className="title"><b>Title: </b>{this.state.title}</p>
              <p className="year" ><b>Release Date: </b>{this.state.release_date}</p>
          </div>
        }
    };

    movieButton = () => {
      if(this.state.edit)
      {
          return <Button variant="danger" type="submit" className="btn-movie" onClick={this.storeData()}>Save Changes</Button>
      }
      else
      {
          return <Button variant="danger" type="submit" className="btn-movie" onClick={this.handleInputEdit}>Edit</Button>
      }
    };

    storeData = () => {
        try {
            const {title} = this.state;
            const {release_date} = this.state;
            let {movie} = this.props;
            movie.title = title;
            movie.release_date = release_date;
            localStorage.setItem(movie.id, JSON.stringify(movie));
        } catch (error) {
            console.log("Error, can't store data locally!");
        }
    };

    render() {
        let {movie} = this.props;

        return (
            <div className="movie rounded">
                {this.titleContainer()}
                <div className="poster rounded">
                    <img className="rounded" src={movie.poster_path} alt="No image found!"/>
                </div>
                <div className="overview rounded">
                    <p>{movie.overview}</p>
                </div>
                <div className="edit-container">
                {this.movieButton()}
                </div>
            </div>
        );
    }
}

