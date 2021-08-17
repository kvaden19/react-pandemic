import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
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

let testPlayers = [kai, vik, adr];

class App extends Component {
  state = {
    players: testPlayers,
    open: false
  };

  onOpenModal() {
    this.setState({ open: true });
  }

  onCloseModal() {
    this.setState({ open: false });
  }

  newGame() {
    console.log('New game!');
  }

  render() {
    return (
      <div className='App w-screen h-screen bg-blue-800'>
        <Header />
        <div className='start box-border m-auto w-1/6 p-4 text-center text-white border-white border-2 bg-red-800'><button onClick={ this.onOpenModal.bind(this) }>New Game</button></div>
        <Modal open={this.state.open} onClose={this.onCloseModal.bind(this)} center classNames={{ 
          overlay: 'customOverlay', modal: 'customModal',
        }}>
          <div className='modal'>
            <h2 className='mb-4'>Okay, let's play! How many players?</h2>
            <div className="input-field col s12">
              <select>
                <option value="" disabled selected>Choose your option</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
        </Modal>
        <div className='mobile'>
        <Warning />
        </div>
        <div className='player-wrapper desktop flex flex-row'>
          <PlayerStatus name={this.state.players[0].playerName}/>
          <PlayerStatus name={this.state.players[1].playerName}/>
          <PlayerStatus name={this.state.players[2].playerName}/>
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