// let's go!
// es6 modules, loads to bundle.js in development
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import './css/style.css'; // Webpack will import it and provide hot-reload
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';


const Root = () => {
  const repo = `/${window.location.pathname.split('/')[1]}`; // spajic

  return (
    <BrowserRouter basename={repo}>
      <div>
        <Match exactly pattern="/" component={StorePicker} />
        <Match pattern="/store/:storeId" component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  );
}

// #main is element in index.html, 'mounting point'
render(<Root />, document.querySelector('#main'));
