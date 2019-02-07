import React from 'react';
import Tilt from 'react-tilt';
import logoImg from './logo.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className="ma4 mt0 center mb6">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 50 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa3">
          <img src={logoImg} alt="emoji" />
        </div>
        <h1 className="f4 bg-near-black white mv0 pv2 ph3">Face Finder</h1>
      </Tilt>
    </div>
  );
};

export default Logo;
