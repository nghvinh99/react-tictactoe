import React from 'react';

function SizeInput({ value, setMin, setMax, decrease, increase }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <span style={{ marginRight: "5px" }}>Table size (3~30):</span>
      <div>
        <div className="value-button" onClick={setMin}>min</div>
        <div className="value-button" onClick={decrease}>-</div>
        <input type="number" value={value} disabled />
        <div className="value-button" onClick={increase}>+</div>
        <div className="value-button" onClick={setMax}>max</div>
      </div>
    </div>
  )
}

export default SizeInput;