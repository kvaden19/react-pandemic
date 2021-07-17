import './App.css';
import Header from './components/Header';
import Warning from './components/Warning';
import Footer from './components/Footer';
import PlayerStatus from './components/PlayerStatus';
import Map from './components/Map';
import Counter from './components/Counter';
import DiseaseStatus from './components/DiseaseStatus';

function App() {
  return (
    <div className='App w-screen h-screen bg-blue-800'>
      <Header />
      <div className='mobile'>
      <Warning />
      </div>
      <div className='player-wrapper desktop flex flex-row'>
        <PlayerStatus />
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

export default App;