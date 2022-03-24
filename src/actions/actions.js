

export const SET_MOVIES = 'SET_MOVIES'; // initializes the movies list with movies
export const SET_FILTER = 'SET_FILTER'; // sets filter to filter movies list
export const SET_USER = 'SET_USER';
export const VALIDATE_INPUT = 'VALIDATE_INPUT';

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

export function setUser(value) {
  return {
    type: SET_USER,
    value
  }; 
}

export function validateInput(
  value = { Username: '', Email: '', Password: '', Birthday: '' },
  field = null
) {
  return {
    type: VALIDATE_INPUT,
    value,
    field,
  };
}