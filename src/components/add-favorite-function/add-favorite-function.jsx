import React from 'react';
import axios from 'axios'; 
import { connect } from 'react-redux';
import { addFavorite } from '../../actions/actions';


export function addFavoriteMovie(e, movie) {
  e.preventDefault();
  const Username = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  axios
      .post(
          `https://jordansmyflix.herokuapp.com/users/${Username}/favorites/${movie._id}`, {},
          {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then((response) => {
          console.log(response);
          alert("Movie add to your Favorties!");
      })
      .catch(function (error) {
          console.log(error);
      });
};


const mapStateToProps = state => {
  return {
    movies: state.movies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFavorite: (movie) => {
      dispatch(addFavorite(movie));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(addFavoriteMovie);