// let's go!
// es6 modules, loads to bundle.js in development
import React from 'react';
import { render } from 'react-dom';
import StorePicker from './components/StorePicker';


// #main is element in index.html, 'mounting point'
render(<StorePicker/>, document.querySelector('#main'));
