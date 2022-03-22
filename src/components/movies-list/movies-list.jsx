import React from 'react';
import { Col }from 'react-bootstrap';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import { SpinnerView } from '../spinner/spinner';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    // .toLowerCase method returns same string in loswer case characters. 
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) {
    <Col md={4} sm={6} id="movie-card__main" >
      <SpinnerView />  
    </Col>
  }   

  return (
    <>
      <Col md={12} style={{ margin: '1em' }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      
      {filteredMovies.map(m => (
        <Col md={4} sm={6} id="movie-card__main" key={movies._id}>
          <MovieCard movieData={m} addFavoriteMovie={(e) => this.addFavorite(e, m)} />
        </Col>
      ))}
    </>
  )
}

// connects MoviesList to store
// mapStateToProps converts store into props for MovieList to use.
// *** REMEMBER: Store contains apps state! ***
export default connect(mapStateToProps)(MoviesList);