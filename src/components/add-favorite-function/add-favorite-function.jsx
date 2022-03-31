import React from 'react';
import axios from 'axios'; 



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
          alert("Movie add to Favortie Movies!");
      })
      .catch(function (error) {
          console.log(error);
      });
};
