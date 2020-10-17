import React from 'react';

function Square({ highlight, onClick, value }) {
  return (
    <button className="square"
      style={{ 'color': highlight ? 'red' : 'black' }}
      onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;