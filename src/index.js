import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { render } from '@testing-library/react';
import Game from './components/Game/index';

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
