import React, { Component } from 'react';
import './App.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Header from './components/Header';
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
    gameStarted: false,
    totalPlayerModal: false,
    indivPlayerModal: false,
    epiModal: false,
    actionModal: false,
    transitModal: false,
    shareModal: false,
    diseaseModal: false,
    playerInput: false,
    playerActions: 3,   // <---- TODO: Action loop fires one more time than it should. 
    players: [],
    playerIndex: 0,
    totalPlayers: 2,
    startingHand: 4,
    playerName: '',
    playerColor: '',
    totalEpidemics: 5,
    masterCities: [],
    infectionDeck: [],
    infectionDiscard: [],
    infectionRate: 2,
    playerDeck: [],
    playerDiscard: [],
    blackDisease: '',
    blueDisease: '',
    redDisease: '',
    yellowDisease: '',
    outbreaks: 0,
    currentAction: 'Drive',
    currentDestination: '',
    currentSharePlayer: '',
    currentShareCity: '',
    currentShareMode: '',
    currentDisease: '',
    winner: false,
    loser: false
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
  // When # of players in array equals total players expected, triggers the Epidemics Modal.
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
    this.setState({ gameStarted: true });

    // For Testing Only, hardcode players
    let player1 = new Player('Kai', 'green');
    let player2 = new Player('Emily', 'blue');
    this.state.players.push(player1, player2);
    console.log('Players: ', this.state.players);

    // Set up Cities
    this.state.masterCities.push(new City('Atlanta', 'blue', ['Chicago', 'Washington', 'Miami'], 110000));
    this.state.masterCities.push(new City('Washington', 'blue', ['New York', 'Montreal', 'Atlanta'], 120000));
    this.state.masterCities.push(new City('New York', 'blue', ['Montreal', 'Washington'], 130000));
    this.state.masterCities.push(new City('Montreal', 'blue', ['New York', 'Washington', 'Chicago'], 140000));
    this.state.masterCities.push(new City('Chicago', 'blue', ['Montreal', 'Atlanta', 'Mexico City', 'Los Angeles', 'San Francisco'], 150000));
    this.state.masterCities.push(new City('San Francisco', 'blue', ['Chicago', 'Los Angeles'], 160000));
    this.state.masterCities.push(new City('Miami', 'yellow', ['Mexico City', 'Atlanta', 'Washington'], 170000));
    this.state.masterCities.push(new City('Mexico City', 'yellow', ['Miami', 'Chicago', 'Los Angeles'], 180000));
    this.state.masterCities.push(new City('Los Angeles', 'yellow', ['Mexico City', 'Chicago', 'San Francisco'], 190000));
    console.log('Master Cities: ', this.state.masterCities);

    // Put research station in Atlanta
    // this.state.masterCities[0].addStation(); -- skip for testing
    player1.location = 'Atlanta';
    player2.location = 'Atlanta';

    // Set up Diseases
    this.setState({blackDisease : new Disease('black')});
    this.setState({blueDisease : new Disease('blue')});
    this.setState({redDisease : new Disease('red')});
    this.setState({yellowDisease : new Disease('yellow')});

    // Create "decks" - lists of cityNames representing the City objects
    let infectionDummy = [];
    let infectionDiscDummy = [];
    let playerDummy = [];

    for (let city of this.state.masterCities) {
      let name = city.cityName;
      playerDummy.push(name);
      infectionDummy.push(name);
    }

    // Randomize the "decks"
    infectionDummy.sort(() => Math.random()-0.5);
    playerDummy.sort(() => Math.random()-0.5);
    // console.log('Infection Deck: ', this.state.infectionDeck);
    // console.log('Player Deck: ', this.state.playerDeck);
      
    // Infect initial cities. TODO: Change back to 3 after testing.
    for (let i=2; i>0; i--) {
      for (let j=2; j>0; j--) {
        let card = infectionDummy.pop();
        infectionDiscDummy.push(card);
        // grab the index (n) of the element in masterCities with this name
        const n = this.state.masterCities.findIndex(city => city.cityName === card);
        let color = this.state.masterCities[n].color;
        this.state.masterCities[n].addDisease(color, i);
      }
    }
    console.log('Cities after infection: ', this.state.masterCities);
    this.setState({ infectionDeck: infectionDummy });
    this.setState({ infectionDiscard: infectionDiscDummy });

    // Deal each Player their starting hand. TODO: Change back to this.state.startingHand after testing.
    for (let p of this.state.players) {
      for (let i=2; i>0; i--) {
        let card = playerDummy.pop();
        p.hand.push(card);
      }
    }
    console.log('Players after dealing: ', this.state.players);

    // Shuffle in Epidemic cards
    // TODO: Hard-coded for 5 epidemics. Need to generalize
    const index = Math.ceil(this.state.playerDeck.length / 5);

    const deck_one = playerDummy.splice(-index);
    const deck_two = playerDummy.splice(-index);
    const deck_three = playerDummy.splice(-index);
    const deck_four = playerDummy.splice(-index);
    const deck_five = playerDummy;

    deck_one.push('Epidemic');
    deck_two.push('Epidemic');
    deck_three.push('Epidemic');
    deck_four.push('Epidemic');
    deck_five.push('Epidemic');

    deck_one.sort(() => Math.random()-0.5);
    deck_two.sort(() => Math.random()-0.5);
    deck_three.sort(() => Math.random()-0.5);
    deck_four.sort(() => Math.random()-0.5);
    deck_five.sort(() => Math.random()-0.5);
    
    playerDummy = [];
    playerDummy.push(...deck_one, ...deck_two, ...deck_three, ...deck_four, ...deck_five);
    this.setState({ playerDeck: playerDummy });
    console.log('Deck after adding Epis: ', this.state.playerDeck);

    // Determine player order
    let playerPops = {};
    for (let p of this.state.players) {
      let largestPop = 0;
      for (let card of p.hand) {
        const n = this.state.masterCities.findIndex(city => city.cityName === card);
        if (this.state.masterCities[n].population > largestPop) {
          largestPop = this.state.masterCities[n].population;
        }
      }
      playerPops[p.playerName] = largestPop;
    }

    this.state.players.sort(function(a, b) { return playerPops[b.playerName] - playerPops[a.playerName] });
    console.log('Player order: ', this.state.players);

    // Close all the modal(s)
    this.setState({ totalPlayerModal: false });
    this.setState({ indivPlayerModal: false });
    this.setState({ epiModal: false });

    // Trigger gameplay
    console.log('Startup finished');
  }

  // For testing only: Clicking the New Game button will trigger this function and run setup
  testRun() {
    this.setup();

    // Give time for setup to run before starting gameplay
    setTimeout(() => {
      console.log('Gameplay triggered');
      console.log('Checking on player Deck: ', this.state.playerDeck);
      console.log('Checking on infection deck: ', this.state.infectionDeck);
      console.log('Checking on master cities: ', this.state.masterCities);
      console.log('Checking on another state var: ', this.state.redDisease);

      // Set active player
      let activePlayer = this.state.players[this.state.playerIndex];
      console.log('Active Player: ', activePlayer);
      const x = this.state.masterCities.findIndex(city => city.cityName === activePlayer.location);
      console.log('Active PlayerLocation: ', this.state.masterCities[x]);
  
      // Kick off first action -- TODO: For component design this is disabled
      // this.startActionFlow();
    }, 1000);
  }

  onOpenActionModal() {
    this.setState({ actionModal: true });
  }

  // Sets currentAction in response to Modal dropdown
  handleActionChange(e) {
    e.preventDefault();
    this.setState({ currentAction: e.target.value });
  }

  // Gathers parameters based on the desired action
  handleActionSubmit(e) {
    e.preventDefault();
    switch(this.state.currentAction) {
      case 'Drive':
      case 'Direct':
      case 'Charter':
      case 'Shuttle':
        this.setState({ transitModal: true });
        break;
      case 'Build':
        const n = this.state.masterCities.findIndex(city => city.cityName === this.state.players[this.state.playerIndex].location);
        this.state.masterCities[n].addStation();
        console.log('Active Location Post: ', this.state.masterCities[n]);
        this.endActionFlow();
        break;
      case 'Share':
        this.setState({ shareModal: true });
        break;
      case 'Treat':
      case 'Cure':
        console.log('Diseases Pre:');
        console.log(this.state.blackDisease);
        console.log(this.state.blueDisease);
        console.log(this.state.redDisease);
        console.log(this.state.yellowDisease);
        this.setState({ diseaseModal: true });
        break;
      default:
        this.setState({ transitModal: true });
    }
  }

  handleTransitChange(e) {
    e.preventDefault();
    this.setState({ currentDestination: e.target.value });
  }

  handleTransitSubmit(e) {
    e.preventDefault();
    this.state.players[this.state.playerIndex].move(this.state.currentDestination);
    console.log('Post: ', this.state.players[this.state.playerIndex]);
    this.endActionFlow();
  }

  handleSharePlayerChange(e) {
    e.preventDefault();
    this.setState({ currentSharePlayer: e.target.value });
  }

  handleShareCityChange(e) {
    e.preventDefault();
    this.setState({ currentShareCity: e.target.value });
  }

  handleShareModeChange(e) {
    e.preventDefault();
    this.setState({ currentShareMode: e.target.value });
  }

  handleShareSubmit(e) {
    e.preventDefault();
    const n = this.state.players.findIndex(player => player.playerName === this.state.currentSharePlayer);
    if (this.state.currentShareMode === 'rec') { // Receive mode
      this.state.players[this.state.playerIndex].addCard(this.state.currentShareCity);
      this.state.players[n].removeCard(this.state.currentShareCity);
    } else { // Give mode
      this.state.players[this.state.playerIndex].removeCard(this.state.currentShareCity);
      this.state.players[n].addCard(this.state.currentShareCity);
    }
    // console.log('Post: ', this.state.players[this.state.playerIndex]);
    // console.log('Post: ', this.state.players[n]);
    this.endActionFlow();
  }

  handleDiseaseChange(e) {
    e.preventDefault();
    this.setState({ currentDisease: e.target.value });
  }

  handleDiseaseSubmit(e) {
    e.preventDefault();
    let targetDisease = '';
    switch(this.state.currentDisease) {
      case 'blue':
        targetDisease = this.state.blueDisease;
        break;
      case 'black':
        targetDisease = this.state.blackDisease;
        break;
      case 'red':
        targetDisease = this.state.redDisease;
        break;
      case 'yellow':
        targetDisease = this.state.yellowDisease;
        break;
      default:
        targetDisease = '';
    }

    if (this.state.currentAction === 'Treat') {
      let cityRef = this.state.players[this.state.playerIndex].location;
      const n = this.state.masterCities.findIndex(city => city.cityName === cityRef);
      this.state.masterCities[n].subtractDisease(this.state.currentDisease, 1);
      console.log('Active Location Post: ', this.state.masterCities[n]);
      this.endActionFlow();
    }

    if (this.state.currentAction === 'Cure') {
      targetDisease.cure(); 
      console.log('Disease Post', targetDisease);
      this.endActionFlow();
    }
  }

  startActionFlow() {
    this.setState({ actionModal: true });
    console.log('Action loop');
  }

  // TODO: Refactor into Promises
  // decrementActions() {
  //   decActions = new Promise((res, rej) => {
  //     this.setState({ playerActions: this.state.playerActions - 1 });
  //     console.log('Player Actions state variable: ', this.state.playerActions);
  //     let numActions = parseInt(this.state.playerActions);
  //     res(numActions);
  //   });

  // turnFlow(numActions) {
  //   console.log(numActions);
  //   if (numActions > 0) {
  //     // this.startActionFlow();
  //     console.log('Actions remaining');
  //   } else {
  //     // this.drawCards();
  //     console.log('Actions done.');
  //   }
  // }

  endActionFlow() {
    // Make sure ALL modals are closed
    this.setState({ totalPlayerModal: false });
    this.setState({ indivPlayerModal: false });
    this.setState({ epiModal: false });
    this.setState({ actionModal: false });
    this.setState({ transitModal: false });
    this.setState({ shareModal: false });
    this.setState({ diseaseModal: false });

    //this.decrementActions.then((res) => this.turnFlow(res));

    // Decrement player actions
    this.setState({ playerActions: this.state.playerActions - 1 });

    // Flow
    if (this.state.playerActions > 0) {
      this.startActionFlow();
    } else {
      this.drawCards();
    }
  }

  drawCards() {
    console.log('Time to draw cards!');
    console.log('Player Deck: ', this.state.playerDeck);
    // "Deal" 2 cards from Player Deck
    for (let i=2; i>0; i--) {
      let card = this.state.playerDeck.pop();
      if (card === 'Epidemic') {
        console.log('EPIDEMIC');
        let epiCity = this.state.infectionDeck.shift();
        console.log('Target city...', epiCity);
        const y = this.state.masterCities.findIndex(city => city.cityName === epiCity);
        let color = this.state.masterCities[y].color;
        this.state.masterCities[y].addDisease(color, 3);
        console.log('Target city post: ', this.state.masterCities[y]);
        this.setState({ infectionRate: this.state.infectionRate + 1 });
        console.log('Infection rate is now ', this.state.infectionRate);
        this.state.infectionDiscard.sort(() => Math.random()-0.5);
        this.state.infectionDeck.push(...this.state.infectionDiscard);
        this.setState({ infectionDiscard: [] });
        console.log('Infection Deck is now ', this.state.infectionDeck);
        console.log('Infection Discard is now ', this.state.infectionDiscard);
      } 
      else { 
        this.state.players[this.state.playerIndex].hand.push(card);
      }
      console.log('Player hand is now...', this.state.players[this.state.playerIndex].hand); 
    }

    // "Infect" number of cities equal to state.infectionRate
    console.log('Infection Deck: ', this.state.infectionDeck);
    for (let i = this.state.infectionRate; i>0; i--) {
      let card = this.state.infectionDeck.pop();
      this.state.infectionDiscard.push(card);
      // grab the index (n) of the element in masterCities with this name
      const z = this.state.masterCities.findIndex(city => city.cityName === card);
      console.log(card, z, this.state.masterCities[z]);
      let color = this.state.masterCities[z].color;
      this.state.masterCities[z].addDisease(color, 1);
      console.log('City infected: ', this.state.masterCities[z]);
    }

    this.checkGameEnd();
  }

  checkGameEnd() {
    if (this.state.blackDisease.cured && this.state.blueDisease.cured && this.state.redDisease.cured && this.state.yellowDisease.cured) 
    {this.setState({ winner:true }) } 
    else if (this.state.outbreaks > 8 || this.state.blackDisease.cubes <= 0 || this.state.blueDisease.cubes <= 0 || this.state.redDisease.cubes <= 0 || this.state.yellowDisease.cubes <= 0 || this.state.playerDeck.length <= 0)
    {this.setState({ loser:true }) }
    else 
    {this.incrementActivePlayer()}
  }

  incrementActivePlayer() {
    if (this.state.playerIndex === this.state.players - 1) {
      this.setState({ playerIndex: 0 });
    } 
    else { this.setState({ playerIndex: this.state.playerIndex + 1 }) }

    this.startActionFlow();
  }

  // This will only get hit if the user X's out of modal
  onCloseModal() {
    this.setState({ totalPlayerModal: false });
    this.setState({ indivPlayerModal: false });
    this.setState({ epiModal: false });
  }

  render() {
    return (
      <div className='App w-screen h-screen'>
        <Header />
        {/* After testing, change back to onOpenTotalPlayerModal */}
        {!this.state.gameStarted && <div className='start box-border m-auto w-1/6 p-4 text-center text-white border-white border-2 bg-red-800'><button onClick={ this.testRun.bind(this) }>Start Game</button></div>}
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
        <Modal id='actionList' open={this.state.actionModal} onClose={this.onCloseModal.bind(this)} center classNames={{ overlay: 'customOverlay', modal: 'customModal' }}>
          <h2 className='mb-4'>What would you like to do?</h2>
            <div className="input-field col s12">
              <form onSubmit={ this.handleActionSubmit.bind(this) }>
                <select value={this.state.currentAction} onChange={this.handleActionChange.bind(this)}>
                  <option value="Drive">Drive/Ferry</option>
                  <option value="Direct">Direct Flight</option>
                  <option value="Charter">Charter Flight</option>
                  <option value="Shuttle">Shuttle Flight</option>
                  <option value="Build">Build Research Station</option>
                  <option value="Share">Share Research</option>
                  <option value="Treat">Treat Disease</option>
                  <option value="Cure">Cure Disease</option>
                </select>
                <button className='box-border ml-2 p-1 text-center text-white border-white border-2 bg-green-800'>Submit</button>
              </form>
            </div>
        </Modal>
        <Modal id='transit' open={this.state.transitModal} onClose={this.onCloseModal.bind(this)} center classNames={{ overlay: 'customOverlay', modal: 'customModal' }}>
            <h2 className='mb-4'>Where are you going?</h2>
            <div className="input-field col s12">
              <form onSubmit={ this.handleTransitSubmit.bind(this) }>
                <input type='text' onChange={this.handleTransitChange.bind(this)} />
                <button className='box-border ml-2 p-1 text-center text-white border-white border-2 bg-green-800'>Submit</button>
              </form>
            </div>
        </Modal>
        <Modal id='share' open={this.state.shareModal} onClose={this.onCloseModal.bind(this)} center classNames={{ overlay: 'customOverlay', modal: 'customModal' }}>
            <h2 className='mb-4'>How do you want to do this?</h2>
            <div className="input-field col s12">
              <form onSubmit={ this.handleShareSubmit.bind(this) }>
                <p>Whom are you sharing with?</p>
                <input type='text' onChange={this.handleSharePlayerChange.bind(this)} />
                <p>What city are you sharing?</p>
                <input type='text' onChange={this.handleShareCityChange.bind(this)} />
                <select value={this.state.currentShareMode} onChange={this.handleShareModeChange.bind(this)}>
                  <option value="give">Giving Research</option>
                  <option value="rec">Receiving Research</option>
                </select>
                <button className='box-border ml-2 p-1 text-center text-white border-white border-2 bg-green-800'>Submit</button>
              </form>
            </div>
        </Modal>
        <Modal id='disease' open={this.state.diseaseModal} onClose={this.onCloseModal.bind(this)} center classNames={{ overlay: 'customOverlay', modal: 'customModal' }}>
            <h2 className='mb-4'>Which disease?</h2>
            <div className="input-field col s12">
              <form onSubmit={ this.handleDiseaseSubmit.bind(this) }>
                <select value={this.state.currentDisease} onChange={this.handleDiseaseChange.bind(this)}>
                  <option value="black">black</option>
                  <option value="blue">blue</option>
                  <option value="red">red</option>
                  <option value="yellow">yellow</option>
                </select>
                <button className='box-border ml-2 p-1 text-center text-white border-white border-2 bg-green-800'>Submit</button>
              </form>
            </div>
        </Modal>
        <Modal id='winner' open={this.state.winner} onClose={this.onCloseModal.bind(this)} center classNames={{ overlay: 'customOverlay', modal: 'customModal' }}>
            <h1 className='mb-4'>YOU WON.</h1>
        </Modal>
        <Modal id='loser' open={this.state.loser} onClose={this.onCloseModal.bind(this)} center classNames={{ overlay: 'customOverlay', modal: 'customModal' }}>
            <h1 className='mb-4'>YOU LOST.</h1>
        </Modal>
        <div className='mobile'>
        <Warning />
        </div>
        <div className='player-wrapper desktop flex flex-row'>
          {this.state.players.length>3 && <PlayerStatus name={this.state.players[3].playerName} color={this.state.players[3].playerColor}/>}
          {this.state.players.length>2 && <PlayerStatus name={this.state.players[2].playerName} color={this.state.players[2].playerColor}/>}
          {this.state.players.length>1 && <PlayerStatus name={this.state.players[1].playerName} color={this.state.players[1].playerColor}/>}
          {this.state.players.length>0 && <PlayerStatus name={this.state.players[0].playerName} color={this.state.players[0].playerColor}/>}
        </div>
        <div className='center-content desktop'>
          <div className='left-side float-left'>
            <div className='disease-wrapper flex flex-col'>
              <Counter counterName='Infection Rate' value={this.state.infectionRate}/>
              <Counter counterName='Outbreaks' value={this.state.outbreaks}/>
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