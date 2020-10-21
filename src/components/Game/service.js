function checkWinning(squares, line, player) {
  const res = line.every(pos => {
    return (squares[pos] === player);
  });
  return res;
}

function getRowLine(pos, limit, start, size) {
  const line = Array(limit).fill(0).map((value, i) => {
    const newPosition = start + pos[i];
    if (Math.floor(start / size) !== Math.floor(newPosition / size))
      return null;
    return newPosition;
  });
  return line;
}

function getColLine(pos, limit, start, size) {
  const line = Array(limit).fill(0).map((value, i) => {
    const newPosition = start + pos[i] * size;
    return newPosition;
  });
  return line;
}

function getDiagLine(pos, limit, start, size) {
  let cut = false;
  const line = Array(limit).fill(0).map((value, i) => {
    const newPosition = start + pos[i] * size + i;
    if (newPosition % size === (size - 1)) {
      cut = true;
      return newPosition;
    }
    if (cut) return null;
    return newPosition;
  });
  return line;
}

function getAntiDiagLine(pos, limit, start, size) {
  let cut = false;
  const line = Array(limit).fill(0).map((value, i) => {
    const newPosition = start - pos[i] * size + i;
    if (newPosition % size === (size - 1)) {
      cut = true;
      return newPosition;
    }
    if (cut) return null;
    return newPosition;
  });
  return line;
}

function calculateWinner(squares, size, index) {
  const res = {
    winner: null,
    line: null,
  }

  if (index === null)
    return res;

  let limit = 3;
  if (size === 4) {
    limit = 4;
  } else if (size >= 5) {
    limit = 5;
  }

  const player = squares[index];
  const position = [...Array(limit).keys()];


  let tIndex = index;
  const differ = 1;
  while ((squares[tIndex] === squares[tIndex - differ]) &&
    (tIndex % size !== 0)) {
    tIndex = tIndex - differ;
  };
  let line = getRowLine(position, limit, tIndex, size);
  let winning = checkWinning(squares, line, player);
  if (!winning) {
    tIndex = index;
    const differ = size;
    while (squares[tIndex] === squares[tIndex - differ]) {
      tIndex = tIndex - differ;
    };
    line = getColLine(position, limit, tIndex, size);
    winning = checkWinning(squares, line, player);
  }

  if (!winning) {
    tIndex = index;
    const differ = size + 1;
    while ((squares[tIndex] === squares[tIndex - differ]) &&
      (tIndex % size !== 0)) {
      tIndex = tIndex - differ;
    };
    console.log("calculateWinner -> tIndex", tIndex)
    line = getDiagLine(position, limit, tIndex, size);
    winning = checkWinning(squares, line, player);
  }

  if (!winning) {
    tIndex = index;
    const differ = size - 1;
    while ((squares[tIndex] === squares[tIndex + differ]) &&
      (tIndex % size !== 0)) {
      tIndex = tIndex + differ;
    };
    line = getAntiDiagLine(position, limit, tIndex, size);
    winning = checkWinning(squares, line, player);
  }

  if (winning) {
    res.winner = player;
    res.line = line;
  }

  return res;
}

export default calculateWinner;