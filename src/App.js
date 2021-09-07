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
const City = require('../src/components/City/City');
const Disease = require('../src/components/Disease/Disease');

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
    masterCities: [],
    infectionDeck: [],
    infectionDiscard: [],
    playerDeck: [],
    playerDiscard: [],
    blackDisease: '',
    blueDisease: '',
    redDisease: '',
    yellowDisease: ''
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
    // let cards = 6 - this.state.totalPlayers;
    let cards = 0;
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
    // Set up Cities - good
    this.state.masterCities.push(new City('Atlanta', 'blue', ['Chicago', 'Washington', 'Miami'], 110000));
    this.state.masterCities.push(new City('Washington', 'blue', ['New York', 'Montreal', 'Atlanta'], 120000));
    this.state.masterCities.push(new City('New York', 'blue', ['Montreal', 'Washington'], 130000));
    this.state.masterCities.push(new City('Montreal', 'blue', ['New York', 'Washington', 'Chicago'], 140000));
    this.state.masterCities.push(new City('Chicago', 'blue', ['Montreal', 'Atlanta', 'Mexico City', 'Los Angeles', 'San Francisco'], 150000));
    this.state.masterCities.push(new City('San Francisco', 'blue', ['Chicago', 'Los Angeles'], 160000));
    this.state.masterCities.push(new City('Miami', 'yellow', ['Mexico City', 'Atlanta', 'Washington'], 170000));
    this.state.masterCities.push(new City('Mexico City', 'yellow', ['Miami', 'Chicago', 'Los Angeles'], 180000));
    this.state.masterCities.push(new City('Los Angeles', 'yellow', ['Mexico City', 'Chicago', 'San Francisco'], 190000));

    // Put research station in Atlanta - good
    this.state.masterCities[0].addStation();

    // Set up Diseases - good
    this.state.blackDisease = new Disease('black');
    this.state.blueDisease = new Disease('blue');
    this.state.redDisease = new Disease('red');
    this.state.yellowDisease = new Disease('yellow');

    // Create decks and shuffle them - good
    // this.state.masterCities.sort((a,b) => b.population - a.population);
    this.state.infectionDeck = JSON.parse(JSON.stringify(this.state.masterCities));
    this.state.infectionDeck.sort(() => Math.random()-0.5);
    this.state.playerDeck = JSON.parse(JSON.stringify(this.state.masterCities));
    this.state.playerDeck.sort(() => Math.random()-0.5);
      
    // Infect initial cities - good
    for (let i=3; i>0; i--) {
      for (let j=3; j>0; j--) {
        let card = this.state.infectionDeck.pop();
        this.state.infectionDiscard.push(card);
        // grab the index (n) of the element in masterCities with this name
        const n = this.state.masterCities.findIndex(city => city.cityName === card.cityName);
        this.state.masterCities[n].addDisease(card.color, i);
      }
    }

    // Deal each PLayer their starting hand - good
    for (let p of this.state.players) {
      for (let i=this.state.startingHand; i>0; i--) {
        let card = this.state.playerDeck.pop();
        p.hand.push(card);
      }
    }

    // Shuffle in Epidemic cards - good
    // TODO: Hard-coded for 5 epidemics. How to generalize?
    const index = Math.ceil(this.state.playerDeck.length / 5);

    const deck_one = this.state.playerDeck.splice(-index);
    const deck_two = this.state.playerDeck.splice(-index);
    const deck_three = this.state.playerDeck.splice(-index);
    const deck_four = this.state.playerDeck.splice(-index);
    const deck_five = this.state.playerDeck;

    deck_one.push(new City('Epidemic', '', [], 0));
    deck_two.push(new City('Epidemic', '', [], 0));
    deck_three.push(new City('Epidemic', '', [], 0));
    deck_four.push(new City('Epidemic', '', [], 0));
    deck_five.push(new City('Epidemic', '', [], 0));

    deck_one.sort(() => Math.random()-0.5);
    deck_two.sort(() => Math.random()-0.5);
    deck_three.sort(() => Math.random()-0.5);
    deck_four.sort(() => Math.random()-0.5);
    deck_five.sort(() => Math.random()-0.5);
    
    this.state.playerDeck = [];
    this.state.playerDeck.push(...deck_one, ...deck_two, ...deck_three, ...deck_four, ...deck_five);

    // Close the modal(s)
    this.onCloseModal();
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