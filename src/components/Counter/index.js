import React from 'react';

function Counter(props) {
  return (
    <div className='box-border p-4 mt-4 text-center bg-yellow-50 rounded-md'>
        <p><span className='font-bold'>{props.counterName}:</span> {props.value}</p>
    </div>
    );
}

export default Counter;