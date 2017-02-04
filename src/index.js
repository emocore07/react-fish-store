// let's go!
// es6 modules, loads to bundle.js in development
import React from 'react';
import { render } from 'react-dom';
import './css/style.css'; // Webpack will import it and provide hot-reload
import App from './components/App';


// #main is element in index.html, 'mounting point'
render(<App/>, document.querySelector('#main'));
