import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
  state = {
    signInEmail: '',
    signInPassword: ''
  };

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmitSignin = () => {
    axios
      .post('https://facefinderapp.herokuapp.com/signin', {
        email: this.state.signInEmail,
        password: this.state.signInPassword
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
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="signInEmail"
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
                  name="signInPassword"
                  id="password"
                  onChange={this.onInputChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="white b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={this.onSubmitSignin}
              />
            </div>
            <div className="lh-copy mt3">
              <button
                onClick={() => onRouteChange('register')}
                className="f6 dim white bg-transparent center"
              >
                Register
              </button>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
