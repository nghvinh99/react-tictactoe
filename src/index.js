import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { render } from '@testing-library/react';

function Square(props) {
  return (
    <button className="square"
    style={{'color': props.highlight ? 'red' : 'black'}} 
    onClick = {props.onClick}>
      {props.value}
    </button>
  );
}

function ToggleButton(props) {
  return (
    <div>
      <input type="checkbox" 
      id="switch" 
      onChange={props.handleChange} 
      checked={props.descending}/>
      <label htmlFor="switch">
        <span>{props.label}
        </span>
      </label>
    </div>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square key={i}
    highlight={this.props.highlight[i]}
    value={this.props.squares[i]}
    onClick = {() => this.props.onClick(i)}
    />;
  }

  renderRow(i) {
    let j;
    const tableRow = [];
    for (j = 0; j < this.props.maxWidth; j = j + 1) {
      tableRow.push(this.renderSquare(3 * i + j))
    }
    return (<div className="board-row" key={i}>
      {tableRow}
    </div>
    )
  }

  render() {
    let i;
    const table = [];
    for (i = 0; i < this.props.maxHeight; i = i + 1) {
      table.push(this.renderRow(i));
    }
    return (
      <div>
        {table}
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      descending: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    const winner = calculateWinner(squares);
    if (winner.winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  handleChange() {
    this.setState({
      descending: !this.state.descending,
    })
  }

  renderMoveList(list) {
    return list.map((step, move) => {
      const desc = move ? 
      'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button style={{'fontWeight': this.state.stepNumber === move ? 'bold' : 'normal'}} 
          onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const tableSize = {
      maxWidth: 3,
      maxHeight: 3,
    }
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const highlight = Array(9).fill(null);

    const moves = this.renderMoveList(history.slice())
    if (this.state.descending) {
      moves.reverse();
    }
    
    let status;
    if (winner.winner) {
      status = 'Winner: ' + winner.winner;
      winner.line.forEach(i => {
        highlight[i] = true;
      })
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            maxWidth={tableSize.maxWidth}
            maxHeight={tableSize.maxHeight}
            highlight={highlight}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ToggleButton
            handleChange={() => this.handleChange()}
            label="Descending move order"
            checked={this.state.descending}
          />
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const res = {
    winner: null,
    line: null,
  }
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      res.winner = squares[a];
      res.line = lines[i];
      // return squares[a];
      return res;
    }
  }
  return res;
  // return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
