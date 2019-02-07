import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  state = {
    email: '',
    password: '',
    name: ''
  };

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onRegister = () => {
    axios
      .post('http://localhost:3001/register', {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
      .then(({ data: user }) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      })
      .catch(err => console.error(err));
  };
  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="white pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="full-name">
                  Full Name
                </label>
                <input
                  className="pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="full-name"
                  onChange={this.onInputChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email"
                  id="email-address"
                  onChange={this.onInputChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onInputChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="white b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib"
                type="submit"
                value="Submit"
                onClick={this.onRegister}
              />
            </div>
            <div className="lh-copy mt3">
              <span>Already a user?</span>{' '}
              <button
                onClick={() => onRouteChange('signin')}
                className="f6 dim white bg-transparent center"
              >
                Sign In
              </button>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
