import React, { Component } from 'react';
import Heart from './Suits/Heart.svg';
import Club from './Suits/Club.svg';
import Diamond from './Suits/Diamond.svg';
import Spade from './Suits/Spade.svg';
import './App.css';
import Deck from './Deck';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={Heart} className="App-logo" alt="Heart" />
          <img src={Club} className="App-logo" alt="Club" />
          <img src={Diamond} className="App-logo" alt="Diamond" />
          <img src={Spade} className="App-logo" alt="Spade" />
          <h2>RnP Cards</h2>
        </div>
        <div className="App-body">
          <div className="container">
            <Deck />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
