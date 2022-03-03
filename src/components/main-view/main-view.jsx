
// Requirment to create component
import React from 'react';
import axios from 'axios'; // Ajax operations 
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';



// React.Component is like a template or blueprint for creating new components 
// export "exposes" MainView, making it available for use by other components, modules and files. aka, youll be able import it into other files
// creates MainView component. "class" states class component, oppposed to function component
export default class MainView extends React.Component { //with extends, basiclly saying "create new MainView using React.Component template"

    // React uses constructor method to create component
    constructor() {
        // OOP, call the constructor of parent class. Initializes component state. Without, Error occurs with this.state
        super();
        // starting value of MainView state.  The place to initialize a state’s values since component hasnt been rendered yet. 
        this.state = {
            movies: [ ],
            // this tells app no movie cards were clicked
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    }
    
    // renders what will be displayed on the screen. The visual representation of component.
    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
          <div className="main-view">
            {selectedMovie
              ? <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              ))
            }
          </div>
          );
        }

    componentDidMount(){
      //setting movies array state to load data from myFlix API
      axios.get('https://jordansmyflix.herokuapp.com/movies')
      .then(response => {
        this.setState({ 
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
    }
}