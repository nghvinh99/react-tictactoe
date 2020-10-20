import React from 'react';

function SizeInput({ value, handleInput }) {
  return (
    <label>
      Table size (3~30):
      <input type="number" value={value} onChange={handleInput} />
    </label>
  )
}

export default SizeInput;