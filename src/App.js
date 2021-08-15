import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Warning from './components/Warning';
import Footer from './components/Footer';
import PlayerStatus from './components/PlayerStatus';
import Map from './components/Map';
import Counter from './components/Counter';
import DiseaseStatus from './components/DiseaseStatus';
const Player = require('../src/components/Player/Player');

// Quick proof of concept. This will happen in another script and get passed to React components for re-rendering.
let kai = new Player('Kai');
let vik = new Player('Vikram');
let adr = new Player('Adrienne');

let players = [kai, vik, adr];

class App extends Component {
  state = {players};

  render() {
    return (
      <div className='App w-screen h-screen bg-blue-800'>
        <Header />
        <div className='mobile'>
        <Warning />
        </div>
        <div className='player-wrapper desktop flex flex-row'>
          <PlayerStatus name={players[0].playerName}/>
          <PlayerStatus name={players[1].playerName}/>
          <PlayerStatus name={players[2].playerName}/>
          {/* <PlayerStatus name={players[3].name}/> */}
        </div>
        <div className='center-content desktop'>
          <div className='left-side float-left'>
            <div className='disease-wrapper flex flex-col'>
              <Counter />
              <Counter />
              <DiseaseStatus />
            </div>
          </div>
          <div className='right-side float-left'>
            <Map />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;