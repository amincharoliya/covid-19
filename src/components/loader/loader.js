import React, { Component } from 'react';
import Logo from '../../logo.svg';
import './loader.css';

class Loader extends Component {
  render() {
    return (
        <div className="loading">
            <img className="w-10 h-10 AnimateRotate" src={Logo} />
            <div>Loading...</div>
        </div>
    );
  }
}

export default Loader;
