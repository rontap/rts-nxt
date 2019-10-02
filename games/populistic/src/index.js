import React from 'react';
import ReactDOM from 'react-dom';

import './nxtjs/design.css';
import './nxtjs/input.css';
import './nxtjs/elements.css';

import './index.css';

import './styles/main.css';
import './styles/media.css';
import './styles/powerups.css';
import './styles/upgrades.css';

/*eslint eqeqeq:0*/
/*eslint-disable*/
/**
 *
 <link rel="stylesheet" href="./nxtjs/elements.css">
 <link rel="stylesheet" href="./nxtjs/design.css">
 <link rel="stylesheet" href="./nxtjs/input.css">
 *
 <script src="./js/powerups.js" type="text/javascript"></script>
 <script src="./js/main.js" type="text/javascript"></script>
 <script src="./js/game.js" type="text/javascript"></script>
 <script src="./js/modes.js" type="text/javascript"></script>
 */
import nxt from './nxtjs/jsplus';
import CONST from './constants';

import powerup from './js/powerups';
import * as main from './js/main';
import * as game from './js/game';
import * as modes from './js/modes';

import App from './App';
console.log(nxt);
nxt.export();

ReactDOM.render(<App />, document.getElementById('root'));

