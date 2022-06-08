import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

import { MovieCard } from "../movie-card/movie-card";

import "./movies-list.scss";

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    // .toLowerCase method returns same string in loswer case characters.
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  return (
    <>
      {/* <Row id="movie-list-row"  > 
        <Col md={4} id="movie-list-col" >
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
      </Row> */}
      {filteredMovies.map((m) => (
        <Col lg={3} md={4} sm={6} sx={12} id="movie-card__main" key={m._id}>
          <MovieCard movieData={m} />
        </Col>
      ))}
    </>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      filter: PropTypes.func,
    })
  ),
  visibilityFilter: PropTypes.string,
};

// connects MoviesList to store
// mapStateToProps converts store into props for MovieList to use.
// *** REMEMBER: Store contains apps state! ***
export default connect(mapStateToProps)(MoviesList);
