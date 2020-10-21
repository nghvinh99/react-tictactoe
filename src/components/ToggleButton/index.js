import React from 'react';

function ToggleButton({ handleChange }) {
  return (
    <div style={{ marginTop: "-10px" }}>
      <input className="tgl tgl-flip"
        id="switch" type="checkbox"
        onChange={handleChange}
      />
      <label className="tgl-btn"
        data-tg-off="Ascending"
        data-tg-on="Descending"
        htmlFor="switch">
      </label>
    </div>
  );
}

export default ToggleButton;