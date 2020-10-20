import React, { useState } from 'react';
import Board from './../Board/index';
import ToggleButton from './../ToggleButton/index';
import calculateWinner from './service';
import ListItem from '../ListItem/index';
import SizeInput from '../SizeInput/index';

function Game() {
  const [tableSize, setTableSize] = useState(3);
  const [history, setHistory] = useState([{
    squares: Array(Math.pow(tableSize, 2)).fill(null),
    index: null,
    winner: null,
  }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [descending, setDescending] = useState(false);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares, tableSize, current.index);
  const highlight = Array(Math.pow(tableSize, 2)).fill(null);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    if (current.winner || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{
      squares: squares,
      index: i,
      winner: current.winner,
    }]))
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  }

  const handleChange = () => {
    setDescending(!descending);
  }

  const handleInput = (event) => {
    const size = event.target.value;
    if ((size >= 3) && (size <= 30))
      setTableSize(event.target.value);
    else return;
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  const checkDraw = (squares) => {
    return (!squares.includes(null));
  }

  let moveList = [];
  const list = history.slice();
  list.map((step, move) => {
    const desc = move ?
      'Go to position ( ' + (Math.floor(step.index / tableSize) + 1) + ', '
      + (step.index % tableSize + 1) + ')'
      : 'Go to game start';
    moveList.push(<ListItem
      key={move}
      move={move}
      stepNumber={stepNumber}
      desc={desc}
      jumpTo={() => jumpTo(move)}
    />);
    return moveList;
  })
  if (descending) {
    moveList.reverse();
  }

  let status;
  if (winner.winner) {
    current.winner = winner.winner;
    status = 'Winner: ' + winner.winner;
    winner.line.forEach(i => {
      highlight[i] = true;
    })
  } else if (checkDraw(current.squares)) {
    status = 'Game draw!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          tableSize={tableSize}
          highlight={highlight}
        />
      </div>
      <div className="game-info">
        <SizeInput
          value={tableSize}
          handleInput={(event) => handleInput(event)}
        />
        <div>{status}</div>
        <ToggleButton
          handleChange={() => handleChange()}
          label="Descending move order"
          checked={descending}
        />
        <ol>
          {moveList}
        </ol>
      </div>
    </div>
  );
}

export default Game;