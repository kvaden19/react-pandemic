import React from 'react';
import './style.css';

function PlayerStatus(props) {
  return (
    <div className='player-status box-border p-4 text-center text-white border-white border-2'>
        <p>Player: {props.name}</p>
    </div>
    );
}

export default PlayerStatus;