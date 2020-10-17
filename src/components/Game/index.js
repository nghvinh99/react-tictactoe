import React, { useState } from 'react';
import Board from './../Board/index';
import ToggleButton from './../ToggleButton/index';
import calculateWinner from './service';
import ListItem from '../ListItem/index';


function Game() {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
    index: null,
  }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [descending, setDescending] = useState(false);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const highlight = Array(9).fill(null);
  const tableSize = 5;

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    const winner = calculateWinner(squares);
    if (winner.winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{
      squares: squares,
      index: i,
    }]))
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  }

  const handleChange = () => {
    setDescending(!descending);
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  const checkDraw = (squares) => {
    return (!squares.includes(null));
  }



  const position = array(math.pow(tableSize, 2));
  let moveList = [];
  const list = history.slice();
  list.map((step, move) => {
    const desc = move ?
      'Go to position (' + position[step.index] + ')' : 'Go to game start';
    moveList.push(<ListItem
      move={move}
      stepNumber={stepNumber}
      desc={desc}
      jumpTo={() => jumpTo(move)}
    />);
  })
  if (descending) {
    moveList.reverse();
  }

  let status;
  if (winner.winner) {
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