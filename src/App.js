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

class App extends Component {
  state = {
    totalPlayerModal: false,
    indivPlayerModal: false,
    epiModal: false,
    players: [],
    totalPlayers: 2,
    startingHand: 4,
    playerName: '',
    playerColor: '',
    totalEpidemics: 5,
  };

  // Opens Total Player (e.g., how many players?) Modal on "New Game" click.
  onOpenTotalPlayerModal() {
    this.setState({ totalPlayerModal: true });
  }

  // Changes totalPlayers (#) in response to modal dropdown.
  handleTotalPlayerChange(e) {
    e.preventDefault();
    let integerPlayers = parseInt(e.target.value);
    this.setState({ totalPlayers: integerPlayers });
  }

  // Sets the startingHand (#) based on totalPlayers. Triggers the Indiv Player (e.g., player name and color) Modal.
  handleTotalPlayerSubmit(e) {
    e.preventDefault();
    let cards = 6 - this.state.totalPlayers;
    this.setState({ startingHand: cards });
    this.setState({ indivPlayerModal: true });
  }

  // Holds a player name in response to modal text input.
  handleIndivNameChange(e) {
    e.preventDefault();
    this.setState({ playerName: e.target.value });
  }

  // Holds a player color in response to modal dropdown.
  handleIndivColorChange(e) {
    e.preventDefault();
    this.setState({ playerColor: e.target.value });
  }

  // Uses player name and color to create a new Player Object and adds new Player to the players array.
  // If # of players in array equals total players expected, triggers the Epidemics Modal.
  // Else re-triggers the Indiv Player Modal.
  handleIndivPlayerSubmit(e) {
    e.preventDefault();
    // TODO: Change to include a color
    let p = new Player(this.state.playerName);
    this.state.players.push(p);
    if (this.state.players.length === this.state.totalPlayers) {
      this.setState({ epiModal: true });
    } else {
      this.setState({ indivPlayerModal: false });
      this.setState({ indivPlayerModal: true });
    }
  }

  // Sets totalEpidemics (#) in response to Modal dropdown
  handleEpiChange(e) {
    e.preventDefault();
    this.setState({ totalEpidemics: e.target.value });
  }

  // Kicks off the rest of the setup tasks
  handleEpiSubmit(e) {
    e.preventDefault();
    this.setup();
  }

  setup() {
    this.onCloseModal();
    // Game setup (1)
    // Construct all City objects (just do NA to start)
        // Set atlanta.research == true
        // Set all player.locations to atlanta
    // Set up 4 disease objects
        // Colors red, blue, yellow, black
        // Cured and Eradicated set to false
        // Cubes = 96
    // Push all City objects onto masterCities array; rank by population
        // let infectionDeck = a copy of masterCities
        // let playerCards = copy of masterCities
        // randomize both
    // for (3, 2, 1):
        // pop off 3 items from infectionCards; add to infectionDiscard
        // add # disease cubes to each
    // pop startingHand number of strings off playerCards and onto player.hand
    // shuffle in Epidemic cards
        // divide playerCards into difficulty # of subarrays
        // push one 'epidemic' string onto each array and randomize
        // combine subarrays
  }

  // This will only get hit if the user X's out of modal
  onCloseModal() {
    this.setState({ totalPlayerModal: false });
    this.setState({ indivPlayerModal: false });
    this.setState({ epiModal: false });
  }

  render() {
    return (
      <div className='App w-screen h-screen bg-blue-800'>
        <Header />
        <div className='start box-border m-auto w-1/6 p-4 text-center text-white border-white border-2 bg-red-800'><button onClick={ this.onOpenTotalPlayerModal.bind(this) }>New Game</button></div>
        <Modal id='totalPlayer' open={this.state.totalPlayerModal} onClose={this.onCloseModal.bind(this)} center classNames={{ overlay: 'customOverlay', modal: 'customModal' }}>
            <h2 className='mb-4'>Okay, let's play! How many players?</h2>
            <div className="input-field col s12">
              <form onSubmit={ this.handleTotalPlayerSubmit.bind(this) }>
                <select value={this.state.totalPlayers} onChange={this.handleTotalPlayerChange.bind(this)}>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <button className='box-border ml-2 p-1 text-center text-white border-white border-2 bg-green-800'>Submit</button>
              </form>
            </div>
        </Modal>
        <Modal id='indivPlayer' open={this.state.indivPlayerModal} onClose={this.onCloseModal.bind(this)} center classNames={{ overlay: 'customOverlay', modal: 'customModal' }}>
            <h2 className='mb-4'>Enter player info:</h2>
            <div className="input-field col s12">
              <form onSubmit={ this.handleIndivPlayerSubmit.bind(this) }>
                <p>Enter your name: </p>
                <input type='text' onChange={this.handleIndivNameChange.bind(this)} />
                <select value={this.state.playerColor} onChange={this.handleIndivColorChange.bind(this)}>
                  <option value="teal">Teal</option>
                  <option value="orange">Orange</option>
                  <option value="indigo">Indigo</option>
                  <option value="lime">Lime</option>
                </select>
                <button className='box-border ml-2 p-1 text-center text-white border-white border-2 bg-green-800'>Submit</button>
              </form>
            </div>
        </Modal>
        <Modal id='epi' open={this.state.epiModal} onClose={this.onCloseModal.bind(this)} center classNames={{ overlay: 'customOverlay', modal: 'customModal' }}>
            <h2 className='mb-4'>How many Epidemics?</h2>
            <div className="input-field col s12">
              <form onSubmit={ this.handleEpiSubmit.bind(this) }>
                <select value={this.state.totalEpidemics} onChange={this.handleEpiChange.bind(this)}>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
                <button className='box-border ml-2 p-1 text-center text-white border-white border-2 bg-green-800'>Submit</button>
              </form>
            </div>
        </Modal>
        <div className='mobile'>
        <Warning />
        </div>
        <div className='player-wrapper desktop flex flex-row'>
          <PlayerStatus />
          <PlayerStatus />
          <PlayerStatus />
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