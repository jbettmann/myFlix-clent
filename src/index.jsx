import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap';
import { createStore } from 'redux'; // fourth and fifth line here import "connect()" fucntion and React Redux. 
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

import MainView from './components/main-view/main-view'; // If MainView doesnt have "default" keyword in main-view.jsx, you must surround it in {} here.

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// makes app entirely accessable to entire app. 
const store = createStore(moviesApp, devToolsEnhancer()); 

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      // Bootstrap Container for styling
      // ** <Provider /> added for Redux use
      <Provider store={store}> 
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);