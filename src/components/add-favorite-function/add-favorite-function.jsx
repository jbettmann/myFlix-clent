import React from "react";
import axios from "axios";

export function addFavoriteMovie(e, movie) {
  e.preventDefault();
  const Username = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  axios
    .post(
      `https://my-flix-app.vercel.app/users/${Username}/favorites/${movie._id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      console.log(response);
      alert("Movie add to Favorite Movies!");
    })
    .catch(function (error) {
      console.log(error);
    });
}
