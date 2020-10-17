import React from 'react';

function ListItem({ move, stepNumber, jumpTo, desc }) {
  return (
    <li key={move}>
      <button style={{ 'fontWeight': stepNumber === move ? 'bold' : 'normal' }}
        onClick={jumpTo}>{desc}</button>
    </li>
  )
}

export default ListItem;