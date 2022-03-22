import { combineReducers } from "redux";

import { SET_FILTER, SET_MOVIES } from "../actions/actions";


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

//  a combinded reducer (reducer made out of other reducers)
const moviesApp = combineReducers({
    visibilityFilter,
    movies
  });


export default moviesApp; 