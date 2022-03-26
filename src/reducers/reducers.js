import { combineReducers } from "redux";

import { 
  SET_FILTER,
  SET_MOVIES, 
  SET_USER,   
  UPDATE_USER,
  ADD_FAVORITE,
  REMOVE_FAVORITE } from "../actions/actions";


// if fucntions are "concerned" by the action, it will change the state
// states that if the given action is "unrelated" to the reducer, then it should return whatever state it’s been given
//  state = '' gives default value to state.
function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      // reducers returns same existing state if no change
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

/* Users */

function user(state = null, action) {
  switch(action.type) {
    case SET_USER:
      return action.user;
    case UPDATE_USER:
      return {
        ...state,
        ...action.user
      };
    default:
      return state;
  }
}

function favoriteMovies(state = [], action) {
  switch(action.type) {
    case ADD_FAVORITE:
      return [
        ...state,
        action.movie
      ];
    case REMOVE_FAVORITE:
      return state.filter(movie => movie !== action.movie);
    default:
      return state;
  }
}


//  a combinded reducer (reducer made out of other reducers)
const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    user,
    favoriteMovies
  });


export default moviesApp; 