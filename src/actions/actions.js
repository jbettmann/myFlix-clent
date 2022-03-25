

export const SET_MOVIES = 'SET_MOVIES'; // initializes the movies list with movies
export const SET_FILTER = 'SET_FILTER'; // sets filter to filter movies list
export const SET_USER = 'SET_USER';
<<<<<<< HEAD
export const VALIDATE_INPUT = 'VALIDATE_INPUT';
=======
export const UPDATE_USER = 'UPDATE_USER';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
>>>>>>> main

// think of funcitons as event constructors. (value) can be name whatever you want. 
export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value
  }; 
}

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }; 
}

<<<<<<< HEAD
export function validateInput(
  value = { Username: '', Email: '', Password: '', Birthday: '' },
  field = null
) {
  return {
    type: VALIDATE_INPUT,
    value,
    field,
  };
=======

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user
  }
}

export function addFavorite(movie) {
  return {
    type: ADD_FAVORITE,
    movie
  }
}

export function removeFavorite(movie) {
  return {
    type: REMOVE_FAVORITE,
    movie
  }
>>>>>>> main
}