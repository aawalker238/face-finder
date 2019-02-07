import React, { Component, Fragment } from 'react';
import Particles from 'react-particles-js';
// import Clarifai from 'clarifai';
import axios from 'axios';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import { particlesConfig, calculateFaceLocation } from './config';
import './App.css';

const initialState = {
  userInput: '',
  imgUrl: '',
  faceBox: {},
  route: 'signin',
  isSingedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  state = initialState;

  loadUser = userData => {
    this.setState({
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        entries: userData.entries,
        joined: userData.joined
      }
    });
  };

  displayFaceBox = faceBox => {
    this.setState({ faceBox });
  };

  onInputChange = event => {
    this.setState({ userInput: event.target.value });
  };

  onSubmit = () => {
    this.setState({
      imgUrl: this.state.userInput
    });

    axios
      .post('http://localhost:3001/imageurl', { input: this.state.userInput })
      .then(({ data }) => data)
      .then(response => {
        if (response) {
          axios
            .post('http://localhost:3001/image', {
              id: this.state.user.id
            })
            .then(({ data: count }) => {
              this.setState({
                user: {
                  ...this.state.user,
                  entries: count
                }
              });
            })
            .catch(err => console.warn(err));
        }
        this.displayFaceBox(calculateFaceLocation(response));
      })
      .catch(err => console.error(err));
  };

  onRouteChange = route => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({
        isSingedIn: true
      });
    }
    this.setState({ route });
  };

  render() {
    const { isSingedIn, faceBox, imgUrl, route, user } = this.state;
    return (
      <div className="App">
        <Particles params={particlesConfig} className="particles" />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSingedIn={isSingedIn}
        />
        <Logo />
        {route === 'home' ? (
          <Fragment>
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm
              onSubmit={this.onSubmit}
              onInputChange={this.onInputChange}
            />
            <FaceRecognition box={faceBox} imgUrl={imgUrl} />
          </Fragment>
        ) : route === 'register' ? (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        ) : (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
