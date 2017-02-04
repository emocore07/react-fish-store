import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  constructor() {
    super();
    const initial_state = {
      fishes: {},
      order: {}
    };
    this.state = initial_state;
  }

  addFish = (fish) => {
    const fishes = {...this.state.fishes};
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    this.setState({ fishes });
  }

  loadSamples = (fish) => {
    this.setState({ fishes: sampleFishes });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="fresh seafood market"/>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    );
  }
}

export default App;
