import React from 'react';
import Square from './../Square/index';

function Board({ highlight, squares, onClick, tableSize }) {
  const renderSquare = (i) => {
    return <Square key={i}
      highlight={highlight[i]}
      value={squares[i]}
      onClick={() => onClick(i)}
    />;
  }

  const renderRow = (i) => {
    let j;
    const tableRow = [];
    for (j = 0; j < tableSize; j = j + 1) {
      tableRow.push(renderSquare(tableSize * i + j))
    }
    return (<div className="board-row" key={i}>
      {tableRow}
    </div>
    )
  }

  let i;
  const table = [];
  for (i = 0; i < tableSize; i = i + 1) {
    table.push(renderRow(i));
  }

  return (
    <div>
      {table}
    </div>
  )
}

export default Board;