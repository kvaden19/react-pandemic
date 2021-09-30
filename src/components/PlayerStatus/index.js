import React from 'react';
import './style.css';

function PlayerStatus(props) {
  return (
    <div className='player-status box-border p-4 text-center bg-yellow-50 rounded-md'>
      <div className={`float-left w-24 h-12 bg-${props.color}-500`}></div>
      <p className='text-lg font-bold'>{props.name}</p>
      <p>The "Generalist"</p>
    </div>
    );
}

export default PlayerStatus;