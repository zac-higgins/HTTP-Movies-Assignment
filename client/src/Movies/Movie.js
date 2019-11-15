import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import MovieCard from "./MovieCard";
import UpdateForm from './UpdateForm';
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  // deleteMovie = id => {
  //   axios
  //     .delete(`http://localhost:5000/api/movies/${id}`)
  //     .then(res => {
  //       this.setState(res.data);
  //       // props.history.push('/');
  //     })
  // }

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <Route
          path="/movies/:id/update-movie/:id"
          render={props => (
            <UpdateForm {...props} item={this.state.movie} updateItem={this.setState} />
          )}
        />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button onClick={() => this.props.history.push(`/movies/${this.state.movie.id}/update-movie/${this.state.movie.id}`)}>Update Info</button>
        <button onClick={() => {
          axios
            .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
            .then(res => {
              console.log(res)
              // this.setState(res.data);
            })
          this.props.history.push('/');
        }}>Delete Movie</button>
      </div>
    );
  }

}
